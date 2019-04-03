export async function getData(url) {
    return (
        fetch(url, {
            cache: 'no-cache',
            credentials: 'include',
            method: 'GET',
            mode: 'cors',
            redirect: 'follow',
            referrer: 'no-referrer',
        })
    );
}