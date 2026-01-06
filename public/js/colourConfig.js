// colourConfig.js

export let boxColours = [];
export let noteColours = [];

export function fetchColourConfig() {
    fetch('/config/colours')
        .then(res => res.json())
        .then(data => {
            boxColours = data.boxColours;
            noteColours = data.noteColours;
        })
        .catch(err => console.log('Error fetching colours:', err));
};