const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json()
    console.log(data)

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

document.getElementById('logout').addEventListener('click', logout);