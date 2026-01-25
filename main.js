const TIMEZONES = {
    US: "America/New_York",
    CA: "America/Toronto",
    GB: "Europe/London",
    FR: "Europe/Paris",
    DE: "Europe/Berlin",
    IT: "Europe/Rome",
    ES: "Europe/Madrid",
    PT: "Europe/Lisbon",
    IN: "Asia/Kolkata",
    JP: "Asia/Tokyo",
    CN: "Asia/Shanghai",
    PK: "Asia/Karachi",
    KR: "Asia/Seoul",
    AE: "Asia/Dubai",
    SA: "Asia/Riyadh",
    IL: "Asia/Jerusalem",
    ZA: "Africa/Johannesburg",
    EG: "Africa/Cairo",
    AU: "Australia/Sydney",
    NZ: "Pacific/Auckland"
};
const ALIASES = {
    "united states": "US",
    "usa": "US",
    "us": "US",
    "new york": "US",
    "nyc": "US",

    "canada": "CA",
    "ca": "CA",
    "toronto": "CA",

    "united kingdom": "GB",
    "uk": "GB",
    "gb": "GB",
    "london": "GB",

    "france": "FR",
    "fr": "FR",
    "paris": "FR",

    "germany": "DE",
    "de": "DE",
    "berlin": "DE",

    "italy": "IT",
    "it": "IT",
    "rome": "IT",

    "spain": "ES",
    "es": "ES",
    "madrid": "ES",

    "pakistan": "PK",
    "pk": "PK",
    "islamabad": "PK",
    "karachi": "PK",
    "lahore": "PK",

    "portugal": "PT",
    "pt": "PT",
    "lisbon": "PT",

    "india": "IN",
    "in": "IN",
    "delhi": "IN",

    "japan": "JP",
    "jp": "JP",
    "tokyo": "JP",

    "china": "CN",
    "cn": "CN",
    "shanghai": "CN",

    "south korea": "KR",
    "korea": "KR",
    "kr": "KR",
    "seoul": "KR",

    "united arab emirates": "AE",
    "uae": "AE",
    "dubai": "AE",

    "saudi arabia": "SA",
    "sa": "SA",
    "riyadh": "SA",

    "israel": "IL",
    "il": "IL",
    "jerusalem": "IL",

    "south africa": "ZA",
    "za": "ZA",
    "johannesburg": "ZA",

    "egypt": "EG",
    "eg": "EG",
    "cairo": "EG",

    "australia": "AU",
    "au": "AU",
    "sydney": "AU",

    "new zealand": "NZ",
    "nz": "NZ",
    "auckland": "NZ"
};

function normalizeInput(value) {
    return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
}

function resolveTimezone(input) {
    const normalized = normalizeInput(input);
    const countryCode = ALIASES[normalized];
    return countryCode ? TIMEZONES[countryCode] : null;
}

const convertBtn = document.getElementById("convertBtn");
const resultEl = document.getElementById("result");

convertBtn.addEventListener("click", () => {
    const inputDatetime = document.getElementById("inputDatetime").value;
    const fromInput = document.getElementById("fromCountry").value;
    const toInput = document.getElementById("toCountry").value;

    if (!inputDatetime || !fromInput || !toInput) {
        resultEl.textContent = "⚠️ Please fill in all fields.";
        return;
    }

    const fromTimezone = resolveTimezone(fromInput);
    const toTimezone = resolveTimezone(toInput);

    if (!fromTimezone || !toTimezone) {
        resultEl.textContent = "❌ Location not supported yet.";
        return;
    }

    const date = new Date(inputDatetime);

    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: toTimezone,
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });

    resultEl.textContent = `🕒 Converted Time: ${formatter.format(date)}`;
});
