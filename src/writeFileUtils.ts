import fs from "fs";

export async function saveToFile(
  filpath: string,
  content: string,
  encoding: BufferEncoding = "utf-8"
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(filpath, content, encoding, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
