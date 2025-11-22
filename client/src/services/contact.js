const END_POINT = '/api';

export const createContact = async (contactData) => {
  console.log('ContactService: Creating contact with data:', contactData);
  const res = await fetch(`${END_POINT}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contactData),
  });

  if (res.status !== 200) {
    return { hasError: true, message: 'A problem occurred creating contact. Please try again.' };
  }

  const contact = await res.json();
  return { hasError: false, contact };
}


export const getContacts = async (token) => {
  const res = await fetch(`${END_POINT}/contacts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (res.status !== 200) {
    return { hasError: true, message: 'A problem occurred fetching contacts. Please try again.' };
  }

  const data = await res.json();
  return data;
}

export const deleteContactById = async (contactId, token) => {
  const res = await fetch(`${END_POINT}/contacts/${contactId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete contact");
  }

  return data;
}

export const updateContactById = async (contactId, contactData, token) => {
  console.log('ContactService: Updating contact', contactId, 'with data:', contactData);
  const res = await fetch(`${END_POINT}/contacts/${contactId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(contactData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update contact");
  }

  return data;
}
