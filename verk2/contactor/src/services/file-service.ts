import { Directory, File, Paths } from 'expo-file-system';
import { v4 as uuidv4 } from 'uuid';
import { ContactThumbnail } from '../types/contact_thumbnail';

const contactDirectory = new Directory(Paths.document, 'contacts');

export interface Contact {
	name: string;
	phoneNumber: string;
	photo: string | null;
}

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
export const saveContact = async (contact: ContactThumbnail): Promise<{ id: string; filename: string }> => {
	// Ensure directory exists
	await setupDirectory();

	const id = uuidv4();
	const filename = `${contact.name}-${id}.json`;

	const file = new File(contactDirectory.uri, filename);

	await onException(() => {
		file.write(JSON.stringify(contact));
	});

	//const fileContent = await loadImage(fileName);

	return { id, filename };
};

/**
 * Loads a single contact
 */
export const loadContact = async (filename: string): Promise<ContactThumbnail | null> => {
	const filepath = `${contactDirectory.uri}/${filename}`;

	const result = await onException(() => {
		const file = new File(contactDirectory.uri, filename);
		return JSON.parse(file.read());
	});

	return result;
};

/**
 * Removes a contact from the directory
 */
export const removeContact = async (filename: string): Promise<void> => {
	await onException(() => {
		const file = new File(contactDirectory.uri, filename);
		if (file.exists) {
			file.delete();
		}
	});
};

/**
 * Gets all contacts from the directory
 */
export const getAllContacts = async (): Promise<{ filename: string; contact: ContactThumbnail }[]> => {
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

// /**
//  * Cleans the entire image directory
//  */
// export const cleanDirectory = async (): Promise<void> => {
// 	await onException(() => {
// 		if (imageDirectory.exists) {
// 			imageDirectory.delete();
// 		}
// 	});
// };

// /**
//  * Copies a file from one location to another
//  */
// export const copyFile = async (sourceUri: string, destinationUri: string): Promise<void> => {
// 	const result = await onException(() => {
// 		const sourceFile = new File(sourceUri);
// 		const destinationFile = new File(destinationUri);
// 		sourceFile.copy(destinationFile);
// 	});

// 	if (result === null) {
// 		throw new Error(`Failed to copy file from ${sourceUri} to ${destinationUri}`);
// 	}
// };
