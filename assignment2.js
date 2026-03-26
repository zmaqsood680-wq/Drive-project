const allData = [
  { name: "Arnold Morrison",  email: "arnold.morrison@example.com",  username: "organicpanda523",   country: "Australia"      },
  { name: "Melvin Watkins",   email: "melvin.watkins@example.com",   username: "bluekoala740",      country: "United States"  },
  { name: "Alicia Menard",    email: "alicia.menard@example.com",    username: "happyelephant476",  country: "Switzerland"    },
  { name: "Brian Phillips",   email: "brian.phillips@example.com",   username: "redzebra971",       country: "United States"  },
  { name: "Beau Roberts",     email: "beau.roberts@example.com",     username: "redwolf976",        country: "New Zealand"    },
  { name: "Vildan Taregul",   email: "vildan.taregul@example.com",   username: "goldenswan681",     country: "Turkey"         },
  { name: "Sedef Aydag",      email: "sedef.aydag@example.com",      username: "angrygoose177",     country: "Turkey"         },
  { name: "Chloe Mckinney",   email: "chloe.mckinney@example.com",   username: "smallbutterfly394", country: "United Kingdom" },
  { name: "Mark Holmes",      email: "mark.holmes@example.com",      username: "tinywolf893",       country: "United Kingdom" },
  { name: "Julie Fisher",     email: "julie.fisher@example.com",     username: "beautifuldog913",   country: "Ireland"        },
  { name: "Jonas Hetzel",     email: "jonas.hetzel@example.com",     username: "orangezebra611",    country: "Germany"        },
  { name: "Julio Little",     email: "julio.little@example.com",     username: "goldenpeacock852",  country: "Ireland"        },
  { name: "Kiyan Sheremeta",  email: "kiyan.sheremeta@example.com",  username: "smallgorilla575",   country: "Ukraine"        },
  { name: "Laila Reith",      email: "laila.reith@example.com",      username: "smalltiger699",     country: "Netherlands"    },
  { name: "Leo Tolonen",      email: "leo.tolonen@example.com",      username: "bigmouse629",       country: "Finland"        },
  { name: "Lilja Eskola",     email: "lilja.eskola@example.com",     username: "bluemeercat172",    country: "Finland"        },
  { name: "Lincoln Jones",    email: "lincoln.jones@example.com",    username: "bigfrog717",        country: "New Zealand"    },
  { name: "Marta Parra",      email: "marta.parra@example.com",      username: "bigcat577",         country: "Spain"          },
  { name: "Sofia Russo",      email: "sofia.russo@example.com",      username: "purplefox243",      country: "Italy"          },
  { name: "Luca Bianchi",     email: "luca.bianchi@example.com",     username: "swiftbird881",      country: "Italy"          },
  { name: "Emma Laurent",     email: "emma.laurent@example.com",     username: "goldlion552",       country: "France"         },
  { name: "Hugo Dupont",      email: "hugo.dupont@example.com",      username: "neonturtle349",     country: "France"         },
  { name: "Nadia Kovacs",     email: "nadia.kovacs@example.com",     username: "silverowl129",      country: "Hungary"        },
  { name: "Sven Eriksson",    email: "sven.eriksson@example.com",    username: "bluefalcon774",     country: "Sweden"         },
  { name: "Astrid Holm",      email: "astrid.holm@example.com",      username: "whitewolf065",      country: "Norway"         },
  { name: "Pedro Alves",      email: "pedro.alves@example.com",      username: "greenleaf432",      country: "Portugal"       },
  { name: "Yuki Tanaka",      email: "yuki.tanaka@example.com",      username: "sakuradeer301",     country: "Japan"          },
  { name: "Chen Wei",         email: "chen.wei@example.com",         username: "dragoncloud588",    country: "China"          },
  { name: "Aiko Sato",        email: "aiko.sato@example.com",        username: "moonpetal917",      country: "Japan"          },
  { name: "Priya Nair",       email: "priya.nair@example.com",       username: "indigobird456",     country: "India"          },
];

let currentPage  = 1;
const rowsPerPage = 10;
let sortCol      = "name";
let sortDir      = "asc";
let workingData  = [...allData];

function sortTable(col) {
  if (sortCol === col) {
    sortDir = sortDir === "asc" ? "desc" : "asc";
  } else {
    sortCol = col;
    sortDir = "asc";
  }
  currentPage = 1;
  render();
}

function render() {
  workingData = [...allData].sort((a, b) => {
    const va = a[sortCol].toLowerCase();
    const vb = b[sortCol].toLowerCase();
    return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  const start  = (currentPage - 1) * rowsPerPage;
  const sliced = workingData.slice(start, start + rowsPerPage);

  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";
  sliced.forEach(user => {
    tbody.innerHTML += `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.username}</td>
        <td>${user.country}</td>
      </tr>`;
  });

  document.getElementById("pageNum").textContent = currentPage;

  const totalPages = Math.ceil(workingData.length / rowsPerPage);
  document.getElementById("prevBtn").disabled = currentPage <= 1;
  document.getElementById("nextBtn").disabled = currentPage >= totalPages;

  ["name", "email", "username", "country"].forEach(col => {
    const th = document.getElementById("th-" + col);
    if (!th) return;
    th.classList.toggle("sorted", col === sortCol);

    const arrow = th.querySelector(".arrow");
    if (col === sortCol) {
      arrow.innerHTML = sortDir === "asc"
        ? "<span>&#9650;</span><span style='opacity:0.3'>&#9660;</span>"
        : "<span style='opacity:0.3'>&#9650;</span><span>&#9660;</span>";
      arrow.style.opacity = "1";
    } else {
      arrow.innerHTML = "<span>&#9650;</span><span>&#9660;</span>";
      arrow.style.opacity = "0.7";
    }
  });
}

function nextPage() {
  const totalPages = Math.ceil(workingData.length / rowsPerPage);
  if (currentPage < totalPages) { currentPage++; render(); }
}
function prevPage() {
  if (currentPage > 1) { currentPage--; render(); }
}

function toggleMode() {
  const isLight = document.body.classList.toggle("light");
  document.getElementById("modeBtn").textContent = isLight ? "Dark Mode" : "Light Mode";
}

render();