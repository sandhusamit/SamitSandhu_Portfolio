const END_POINT = '/api';

export const getAboutInfo = async () => {
    console.log('AboutService: Fetching about info');
    const res = await fetch(`${END_POINT}/about/690e437cb7760af2bfc37391`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    });
    
    if (res.status !== 200) {
        return { hasError: true, message: 'A problem occurred fetching about info. Please try again.' };
    }
    
    const data = await res.json();
    return { hasError: false, data };
    };

    
