import fs from "fs";

export async function deleteFile(fileName: string): Promise<void> {
  try {
    fs.promises.stat(fileName);
  } catch (error) {
    console.log(`Non existent file: ${fileName}`);
  }

  await fs.promises.unlink(fileName);
}
