export default function formatStringData(data: string) {
  const day = data.split("/")[0];
  const month = data.split("/")[1];
  const year = data.split("/")[2];
  return `${year}-${month}-${day}`
}