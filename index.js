
function displayResults(responseQuery) {
    $('#render').empty();
    responseQuery.forEach(repo => {
        $("#render").append(repo)
    });
}

function App() {
    $("form").on("submit", function (event) {
        event.preventDefault();
        let textInput = $("input").val();
        fetch(`https://api.github.com/users/${textInput}/repos`)
            .then(response => {
                if (response.ok) {
                  return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJson => {
                console.log(responseJson);
                let responseQuery = [];
                responseJson.forEach(repo => {
                    let repoData = `
                        <li>
                            <h2>${repo.name}</h2>
                            <a href="${repo.html_url}">Link to Repo</a>
                        </li>
                    `;
                    responseQuery.push(repoData);
                });
                displayResults(responseQuery);
            })
            .catch((error) => {
                $("#render").html(error);
            });
        }
    );
}

App();