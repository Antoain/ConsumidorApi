document.getElementById('getDataBtn').addEventListener('click', fetchChessData);

function fetchChessData() {
    fetch('https://api.chess.com/pub/player/hikaru')
        .then(response => {
            if (!response.ok) {
                throw new Error('hubo un error de red');
            }
            return response.json();
        })
        .then(playerData => {
            fetch('https://api.chess.com/pub/player/hikaru/stats')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Hubo un error de red');
                    }
                    return response.json();
                })
                .then(data => {
                    document.getElementById('data').innerHTML = `
                        <img src="${playerData.avatar}" alt="Hikaru Nakamura">
                        <p><strong>Nombre de Usuario:</strong> ${playerData.username}</p>
                        <p><strong>Blitz Rating:</strong> ${data.chess_blitz.last.rating}</p>
                        <p><strong>Rapid Rating:</strong> ${data.chess_rapid.last.rating}</p>
                    `;
                })
                .catch(error => {
                    document.getElementById('data').innerText = 'no se pudieron obtener los datos: ' + error.message;
                });
        })
        .catch(error => {
            document.getElementById('data').innerText = 'no se pudieron obtener los datos: ' + error.message;
        });
}