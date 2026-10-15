/**
 * Posts form values as JSON. Throws when the request fails so ContactForm shows its error message.
 * Empty optional values are left out of the payload.
 */
export async function submitForm(url, values) {
  const payload = Object.fromEntries(Object.entries(values).filter(([, value]) => value !== ""));
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
}
