export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);

    return true;
  } catch (err) {
    throw new Error(err);
  }
}
