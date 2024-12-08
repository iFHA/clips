import { FieldValue } from "@angular/fire/firestore";

export default interface IClip {
  docId?: string;
  uid: string;
  displayName: string;
  title: string;
  fileName: string;
  url: string;
  timestamp: FieldValue
}
