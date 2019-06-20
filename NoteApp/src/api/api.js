export var get = (url) => {
    return  fetch(url)
            .then(response => response.json())
            .catch((err) => console.log(err));
}

export var del = (url, id) => {
    fetch(url + id, {
        method: 'DELETE',
        body: JSON.stringify(id),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
}

export var post = (url, note) => {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(note),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
}

export var put = (url, note) => {
    fetch(url + note.id, {
        method: 'PUT',
        body: JSON.stringify(note),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
}