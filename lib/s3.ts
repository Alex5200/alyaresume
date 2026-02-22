import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// S3 Client Configuration for Selectel
export const s3Client = new S3Client({
  region: process.env.AWS_REGION || "ru-3",
  endpoint: process.env.S3_ENDPOINT, // Берем только из env, без fallback
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
  forcePathStyle: true,
});

export const S3_BUCKET = process.env.S3_BUCKET_NAME || "";

// Upload file to S3
export async function uploadToS3(
  fileBuffer: Buffer,
  key: string,
  contentType: string = "application/pdf"
) {
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
    ACL: "public-read",
  });

  await s3Client.send(command);

  // Return public URL for Selectel - только из env переменной
  return `${process.env.PUBLIC_S3_ENDPOINT}/${key}`;
}

// Delete file from S3
export async function deleteFromS3(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
  });

  await s3Client.send(command);
}

// List files in S3
export async function listS3Files(prefix: string = "portfolio/") {
  const command = new ListObjectsV2Command({
    Bucket: S3_BUCKET,
    Prefix: prefix,
  });

  const response = await s3Client.send(command);
  return response.Contents || [];
}

// Generate signed URL for upload
export async function getSignedUploadUrl(key: string, contentType: string = "application/pdf") {
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
    ContentType: contentType,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  return signedUrl;
}

// === Функции для работы с JSON метаданными ===

// Получить JSON метаданные из S3
export async function getJsonFromS3(key: string): Promise<any | null> {
  try {
    const command = new GetObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
    });

    const response = await s3Client.send(command);
    const body = await response.Body?.transformToString();
    
    if (body) {
      return JSON.parse(body);
    }
    return null;
  } catch (error: any) {
    if (error.name === 'NoSuchKey') {
      return null;
    }
    console.error('Error getting JSON from S3:', error);
    throw error;
  }
}

// Сохранить JSON метаданные в S3
export async function saveJsonToS3(key: string, data: any): Promise<void> {
  const jsonString = JSON.stringify(data, null, 2);
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
    Body: jsonString,
    ContentType: 'application/json',
    ACL: 'public-read',
  });

  await s3Client.send(command);
}

// Получить метаданные портфолио из S3
export async function getPortfolioMetadata(): Promise<any | null> {
  return getJsonFromS3('portfolio/metadata.json');
}

// Сохранить метаданные портфолио в S3
export async function savePortfolioMetadata(data: any): Promise<void> {
  return saveJsonToS3('portfolio/metadata.json', data);
}
