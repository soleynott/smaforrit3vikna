import { Directory, File, Paths} from "expo-file-system";

const contactDirectory = new Directory(Paths.document, "contacts");

export interface ContactItem {
    name: string;
    type: "contact";
    file: string;
}

