

export const getProjects = async () => {
    const res = await fetch(`/api/projects`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    });
    
    if (res.status < 200 || res.status >= 300) {
      return { hasError: true, message: 'A problem occurred fetching projects. Please try again.' };
    }
    
    const data = await res.json();
    return data;
}

export const deleteProjectById = async (projectId, token) => {
    const res = await fetch(`/api/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw new Error(data.message || "Failed to delete project");
    }
  
    return data;
  };
  