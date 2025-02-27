document.getElementById('getDataBtn').addEventListener('click', fetchChessData);

function fetchChessData() {
    const username = document.getElementById('username').value;
    if (!username) {
        document.getElementById('data').innerText = 'Por favor, introduce un nombre de usuario';
        return;
    }

    fetch(`https://api.chess.com/pub/player/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un error de red');
            }
            return response.json();
        })
        .then(playerData => {
            fetch(`https://api.chess.com/pub/player/${username}/stats`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Hubo un error de red');
                    }
                    return response.json();
                })
                .then(data => {
                    document.getElementById('data').innerHTML = `
                        <img src="${playerData.avatar}" alt="${username}">
                        <p><strong>Nombre de Usuario:</strong> ${playerData.username}</p>
                        <p><strong>Blitz Rating:</strong> ${data.chess_blitz.last.rating}</p>
                        <p><strong>Rapid Rating:</strong> ${data.chess_rapid.last.rating}</p>
                    `;
                })
                .catch(error => {
                    document.getElementById('data').innerText = 'No se pudieron obtener los datos: ' + error.message;
                });
        })
        .catch(error => {
            document.getElementById('data').innerText = 'No se pudieron obtener los datos: ' + error.message;
        });
}
