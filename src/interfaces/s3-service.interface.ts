export interface IS3Service {
  writeDataToS3<T>(data: T, fileName?: string, bucketName?: string): Promise<void>;
}
