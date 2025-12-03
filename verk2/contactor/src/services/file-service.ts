import { Directory, File, Paths } from 'expo-file-system';
import uuid from 'react-native-uuid';
import { ContactThumbnail } from '../types/contact_thumbnail';
import * as Contacts from 'expo-contacts';

const contactDirectory = new Directory(Paths.document, 'contacts');

export interface Contact {
	name: string;
	phoneNumber: string;
	photo: string | null;
}

const generateId = (): string => {
	return uuid.v4();
};

type ErrorHandler = (error: Error) => void;

// Generic error handler with proper typing
const onException = async <T>(
	cb: () => T | Promise<T>,
	errorHandler?: ErrorHandler,
): Promise<T | null> => {
	try {
		return await cb();
	} catch (err) {
		const error = err instanceof Error ? err : new Error(String(err));

		if (errorHandler) {
			errorHandler(error);
		} else {
			console.error('[ContactFileService Error]:', error.message);
		}

		return null;
	}
};

/**
 * Sets up the contact directory if it doesn't exist
 */
const setupDirectory = async (): Promise<void> => {
	await onException(() => {
		if (!contactDirectory.exists) {
			contactDirectory.create();
			console.log('Contact directory created:', contactDirectory.uri);
		}
	});
};

/**
 * save a contact to the directory
 */
export const saveContact = async (
	contact: ContactThumbnail,
): Promise<{ id: string; filename: string }> => {
	// Ensure directory exists
	await setupDirectory();

	const id = generateId();
	const filename = `${contact.name}-${id}.json`;

	console.log('[FileService] Saving contact:', filename);

	await onException(async () => {
		const file = new File(contactDirectory, filename);
		await file.write(JSON.stringify(contact));
		console.log('[FileService] Successfully saved:', filename);
	});

	return { id, filename };
};

/**
 * Loads a single contact
 */
export const loadContact = async (filename: string): Promise<ContactThumbnail | null> => {
	const result = await onException(async () => {
		const file = new File(contactDirectory, filename);
		const content = await file.text();
		return JSON.parse(content);
	});

	return result;
};

/**
 * Removes a contact from the directory
 */
export const removeContact = async (filename: string): Promise<void> => {
	console.log('[FileService] Deleting contact file:', filename);
	await onException(async () => {
		const file = new File(contactDirectory, filename);
		await file.delete();
		console.log('[FileService] Successfully deleted:', filename);
	});
};

/**
 * Gets all contacts from the directory
 */
export const getAllContacts = async (): Promise<
	{ filename: string; contact: ContactThumbnail }[]
> => {
	// Check if directory exists
	await setupDirectory();

	const items = await onException(() => contactDirectory.list());

	if (!items) return [];

	// Filter to only get File instances that are JSON
	const contactFiles = items.filter(
		(item) => item instanceof File && (item as File).name.endsWith('.json'),
	) as File[];

	//load all contacts
	const contacts = await Promise.all(
		contactFiles.map(async (file) => {
			const contact = await loadContact(file.name);
			return {
				filename: file.name,
				contact,
			};
		}),
	);

	return contacts.filter((c) => c !== null) as {
		filename: string;
		contact: ContactThumbnail;
	}[];
};

/**
 * Imports contacts from device contacts
 */
export const importContactsFromDevice = async (): Promise<ContactThumbnail[]> => {
	const result = await onException(async () => {
		const permission = await Contacts.requestPermissionsAsync();

		if (permission.status !== 'granted') {
			throw new Error('Permission to access contacts was denied');
		}

		const data = await Contacts.getContactsAsync({
			fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Image],
		});

		// Expo Contacts may return the contacts array under `data` or `contacts` depending on SDK/version.
		const rawContacts: any[] = (data as any).data ?? (data as any).contacts ?? [];

		const importedContacts: ContactThumbnail[] = rawContacts
			.filter((contact: any) => contact.phoneNumbers && contact.phoneNumbers.length > 0)
			.map((contact: any) => ({
				name: contact.name || 'Unknown',
				phoneNumber: contact.phoneNumbers?.[0].number || '',
				thumbnailPhoto: contact.image?.uri || null,
				filename: undefined, // New contacts don't have filenames yet
			}));

		return importedContacts;
	});

	return result || [];
};
