function populateTimeZones(selectId1, selectId2) {
    const select1 = document.getElementById(selectId1);
    const select2 = document.getElementById(selectId2);
    const timezones = Intl.supportedValuesOf('timeZone');

    timezones.forEach(zone => {
        const option1 = document.createElement('option');
        option1.value = zone;
        option1.textContent = zone;
        select1.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = zone;
        option2.textContent = zone;
        select2.appendChild(option2);
    });
}

window.onload = () => {
    populateTimeZones('fromTimezone', 'toTimezone');

    const userZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.getElementById('fromTimezone').value = userZone;
    document.getElementById('toTimezone').value = userZone;
};

function convertTime(inputTime, toTimezone) {
    if (!inputTime) {
        return "Please select a time...";
    }

    const date = new Date(inputTime);

    const options = {
        timeZone: toTimezone,
        dateStyle: 'medium',
        timeStyle: 'medium',
        hour12: true
    };

    try {
        const formatter = new Intl.DateTimeFormat('en-US', options);
        return formatter.format(date);
    } catch (error) {
        console.error("Invalid time zone:", toTimezone);
        return "Invalid time zone selected.";
    }
}

const convertBtn = document.getElementById('convertBtn');

convertBtn.addEventListener('click', () => {
    const timeInput = document.getElementById('inputDatetime').value;
    const zoneSelect = document.getElementById('toTimezone').value;

    const result = convertTime(timeInput, zoneSelect);
    document.getElementById('result').innerText = result;
});
