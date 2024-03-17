export interface JsonEncodable {
  [key: string]:
    | string
    | number
    | boolean
    | Date
    | JsonEncodable
    | JsonEncodableArray;
}
type JsonEncodableArray = (
  | string
  | number
  | boolean
  | Date
  | JsonEncodable
  | JsonEncodableArray
)[];

// Helper to pass private meta data to Modal
export function encodePrivateMetadata<T extends JsonEncodable>(
  data: T,
): string {
  return JSON.stringify(data);
}

export function decodePrivateMetaData<T>(data: string): T {
  return JSON.parse(data);
}
