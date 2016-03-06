// //Holds game state.  Make sure to use databases guys.
//var mongodb = require('shareddb'),
var puzzleFactory = require('./puzzleModules/puzzleFactory');
var bigInt = require('big-integer');
// app.get('/puzzleInfo/:uid/:n', game.getPuzzleInfo); //Get info of puzzle n for user uid
// app.get('/mapInfo/:uid', game.getMapInfo); //Get map info for uid.  Sends a map id #
// app.get('/gameStatus/:uid', game.getGameStatus); //Data on whether the game has ended, what the map identifier is for uid
// app.get('/joinGame/:name', game.join); //User wants to join the game with name
// app.get('/solution/:uid/:solution', game.proposeSolution); //User wants to propose a solution for its current puzzle

//IMPORTANT CONSTANTS~~~~~~~~~~~~~~~~~~~~~~~~~
//TODO since some of these could end up in DB.  Feel free to put stuff here though
var gMapNumber = 0; // Update sequence number of map
var gGameNumber = 0; // Game sequence number
var gRingNumber = 1; //Number of normal rings
var gGame = {};
var gPlyN = {}; //All player names
var gSolutions = [];
var gStatus = [];
var gOutputMap = [];
var gWords = [   "Word",   "a",   "abandon",   "ability",   "able",   "abortion",   "about",   "about",   "above",   "above",   "abroad",   "absence",   "absolute",   "absolutely",   "absorb",   "abstract",   "abuse",   "abuse",   "academic",   "accelerate",   "accent",   "accept",   "acceptable",   "acceptance",   "access",   "access",   "accessible",   "accident",   "accommodate",   "accompany",   "accomplish",   "accomplishment",   "according",   "account",   "account",   "accountability",   "accounting",   "accuracy",   "accurate",   "accurately",   "accusation",   "accuse",   "achieve",   "achievement",   "acid",   "acknowledge",   "acquire",   "acquisition",   "across",   "across",   "act",   "act",   "action",   "active",   "actively",   "activist",   "activity",   "actor",   "actress",   "actual",   "actually",   "ad",   "adapt",   "add",   "added",   "addition",   "addition",   "additional",   "address",   "address",   "adequate",   "adjust",   "adjustment",   "administer",   "administration",   "administrative",   "administrator",   "admire",   "admission",   "admit",   "adolescent",   "adopt",   "adoption",   "adult",   "advance",   "advance",   "advanced",   "advantage",   "adventure",   "advertising",   "advice",   "advise",   "adviser",   "advocate",   "advocate",   "aesthetic",   "affair",   "affect",   "afford",   "afraid",   "African",   "African-American",   "after",   "after",   "afternoon",   "afterward",   "again",   "against",   "age",   "age",   "agency",   "agenda",   "agent",   "aggression",   "aggressive",   "ago",   "agree",   "agreement",   "agricultural",   "agriculture",   "ah",   "ahead",   "ahead",   "aid",   "aid",   "aide",   "AIDS",   "aim",   "aim",   "air",   "aircraft",   "airline",   "airplane",   "airport",   "aisle",   "alarm",   "album",   "alcohol",   "alien",   "alike",   "alive",   "all",   "all",   "allegation",   "alleged",   "allegedly",   "alley",   "alliance",   "allow",   "ally",   "almost",   "alone",   "alone",   "along",   "along",   "alongside",   "already",   "also",   "alter",   "alternative",   "alternative",   "although",   "altogether",   "aluminum",   "always",   "AM",   "amazing",   "ambassador",   "ambition",   "ambitious",   "amendment",   "American",   "American",   "amid",   "among",   "amount",   "analysis",   "analyst",   "analyze",   "ancestor",   "ancient",   "and",   "and/or",   "angel",   "anger",   "angle",   "angry",   "animal",   "ankle",   "anniversary",   "announce",   "announcement",   "annual",   "annually",   "anonymous",   "another",   "another",   "answer",   "answer",   "anticipate",   "anxiety",   "anxious",   "any",   "any",   "anybody",   "anymore",   "anyone",   "anything",   "anyway",   "anywhere",   "apart",   "apart",   "apartment",   "apologize",   "apology",   "apparent",   "apparently",   "appeal",   "appeal",   "appear",   "appearance",   "apple",   "application",   "apply",   "appoint",   "appointment",   "appreciate",   "appreciation",   "approach",   "approach",   "appropriate",   "approval",   "approve",   "approximately",   "Arab",   "Arab",   "architect",   "architecture",   "area",   "arena",   "argue",   "argument",   "arise",   "arm",   "arm",   "armed",   "army",   "around",   "around",   "arrange",   "arrangement",   "array",   "arrest",   "arrest",   "arrival",   "arrive",   "arrow",   "art",   "article",   "articulate",   "artifact",   "artificial",   "artist",   "artistic",   "as",   "as",   "as",   "ash",   "Asian",   "aside",   "ask",   "asleep",   "aspect",   "ass",   "assault",   "assemble",   "assembly",   "assert",   "assess",   "assessment",   "asset",   "assign",   "assignment",   "assist",   "assistance",   "assistant",   "assistant",   "associate",   "associate",   "associate",   "associated",   "association",   "assume",   "assumption",   "assure",   "astronomer",   "at",   "athlete",   "athletic",   "atmosphere",   "atop",   "attach",   "attack",   "attack",   "attempt",   "attempt",   "attend",   "attendance",   "attention",   "attitude",   "attorney",   "attract",   "attraction",   "attractive",   "attribute",   "auction",   "audience",   "aunt",   "author",   "authority",   "authorize",   "auto",   "automatic",   "automatically",   "automobile",   "autonomy",   "availability",   "available",   "average",   "average",   "average",   "avoid",   "await",   "awake",   "award",   "award",   "aware",   "awareness",   "away",   "away",   "awful",   "baby",   "back",   "back",   "back",   "background",   "backyard",   "bacteria",   "bad",   "badly",   "bag",   "bake",   "balance",   "balance",   "balanced",   "ball",   "balloon",   "ballot",   "ban",   "ban",   "banana",   "band",   "bank",   "banker",   "banking",   "bankruptcy",   "bar",   "bare",   "barely",   "barn",   "barrel",   "barrier",   "base",   "base",   "baseball",   "basement",   "basic",   "basically",   "basis",   "basket",   "basketball",   "bat",   "bath",   "bathroom",   "battery",   "battle",   "battle",   "bay",   "be",   "beach",   "beam",   "bean",   "bear",   "bear",   "beard",   "beast",   "beat",   "beat",   "beautiful",   "beauty",   "because",   "because",   "become",   "bed",   "bedroom",   "bee",   "beef",   "beer",   "before",   "before",   "before",   "beg",   "begin",   "beginning",   "behalf",   "behave",   "behavior",   "behavioral",   "behind",   "behind",   "being",   "belief",   "believe",   "bell",   "belly",   "belong",   "below",   "below",   "belt",   "bench",   "bend",   "beneath",   "benefit",   "benefit",   "beside",   "besides",   "besides",   "best",   "best",   "bet",   "bet",   "better",   "better",   "between",   "beyond",   "beyond",   "bias",   "Bible",   "bicycle",   "bid",   "big",   "bike",   "bill",   "billion",   "bind",   "biography",   "biological",   "biology",   "bird",   "birth",   "birthday",   "bishop",   "bit",   "bit",   "bite",   "bite",   "bitter",   "black",   "black",   "blade",   "blame",   "blank",   "blanket",   "blast",   "blend",   "bless",   "blessing",   "blind",   "blink",   "block",   "block",   "blond",   "blood",   "bloody",   "blow",   "blow",   "blue",   "blue",   "board",   "boast",   "boat",   "body",   "boil",   "bold",   "bolt",   "bomb",   "bomb",   "bombing",   "bond",   "bone",   "bonus",   "book",   "boom",   "boost",   "boot",   "booth",   "border",   "boring",   "born",   "borrow",   "boss",   "both",   "both",   "bother",   "bottle",   "bottom",   "bottom",   "bounce",   "boundary",   "bow",   "bow",   "bowl",   "box",   "boy",   "boyfriend",   "brain",   "brake",   "branch",   "brand",   "brave",   "bread",   "break",   "break",   "breakfast",   "breast",   "breath",   "breathe",   "breathing",   "breeze",   "brick",   "bride",   "bridge",   "brief",   "briefly",   "bright",   "brilliant",   "bring",   "British",   "broad",   "broadcast",   "broadcast",   "broken",   "broker",   "bronze",   "brother",   "brown",   "brush",   "brush",   "brutal",   "bubble",   "buck",   "bucket",   "buddy",   "budget",   "bug",   "build",   "builder",   "building",   "bulb",   "bulk",   "bull",   "bullet",   "bunch",   "burden",   "bureau",   "burn",   "burning",   "burst",   "bury",   "bus",   "bush",   "business",   "businessman",   "busy",   "but",   "but",   "butt",   "butter",   "butterfly",   "button",   "buy",   "buyer",   "by",   "by",   "cab",   "cabin",   "cabinet",   "cable",   "cage",   "cake",   "calculate",   "calculation",   "calendar",   "call",   "call",   "calm",   "calm",   "camera",   "camp",   "campaign",   "campus",   "can",   "can",   "Canadian",   "cancel",   "cancer",   "candidate",   "candle",   "candy",   "canvas",   "cap",   "capability",   "capable",   "capacity",   "capital",   "captain",   "capture",   "car",   "carbohydrate",   "carbon",   "card",   "care",   "care",   "career",   "careful",   "carefully",   "cargo",   "carpet",   "carrier",   "carrot",   "carry",   "cart",   "cartoon",   "carve",   "case",   "case",   "cash",   "casino",   "cast",   "cast",   "casual",   "casualty",   "cat",   "catalog",   "catch",   "catch",   "category",   "Catholic",   "Catholic",   "cattle",   "cause",   "cause",   "cave",   "cease",   "ceiling",   "celebrate",   "celebration",   "celebrity",   "cell",   "cemetery",   "center",   "central",   "century",   "CEO",   "ceremony",   "certain",   "certainly",   "chain",   "chair",   "chairman",   "challenge",   "challenge",   "chamber",   "champion",   "championship",   "chance",   "change",   "change",   "changing",   "channel",   "chaos",   "chapter",   "character",   "characteristic",   "characterize",   "charge",   "charge",   "charge",   "charity",   "charm",   "chart",   "charter",   "chase",   "cheap",   "cheat",   "check",   "check",   "cheek",   "cheer",   "cheese",   "chef",   "chemical",   "chemical",   "chemistry",   "chest",   "chew",   "chicken",   "chief",   "chief",   "child",   "childhood",   "chill",   "chin",   "Chinese",   "chip",   "chocolate",   "choice",   "cholesterol",   "choose",   "chop",   "Christian",   "Christian",   "Christianity",   "Christmas",   "chronic",   "chunk",   "church",   "cigarette",   "circle",   "circle",   "circuit",   "circumstance",   "cite",   "citizen",   "citizenship",   "city",   "civic",   "civil",   "civilian",   "civilian",   "civilization",   "claim",   "claim",   "class",   "classic",   "classical",   "classify",   "classroom",   "clay",   "clean",   "clean",   "clear",   "clear",   "clearly",   "clerk",   "click",   "client",   "cliff",   "climate",   "climb",   "cling",   "clinic",   "clinical",   "clip",   "clock",   "close",   "close",   "close",   "closed",   "closely",   "closer",   "closest",   "closet",   "cloth",   "clothes",   "clothing",   "cloud",   "club",   "clue",   "cluster",   "coach",   "coach",   "coal",   "coalition",   "coast",   "coastal",   "coat",   "cocaine",   "code",   "coffee",   "cognitive",   "coin",   "cold",   "cold",   "collaboration",   "collapse",   "collapse",   "collar",   "colleague",   "collect",   "collection",   "collective",   "collector",   "college",   "colonial",   "colony",   "color",   "color",   "colorful",   "column",   "columnist",   "combat",   "combination",   "combine",   "combined",   "come",   "comedy",   "comfort",   "comfortable",   "coming",   "command",   "command",   "commander",   "comment",   "comment",   "commercial",   "commission",   "commissioner",   "commit",   "commitment",   "committee",   "commodity",   "common",   "commonly",   "communicate",   "communication",   "community",   "companion",   "company",   "comparable",   "compare",   "comparison",   "compel",   "compelling",   "compensation",   "compete",   "competition",   "competitive",   "competitor",   "complain",   "complaint",   "complete",   "complete",   "completely",   "complex",   "complex",   "complexity",   "compliance",   "complicated",   "comply",   "component",   "compose",   "composition",   "compound",   "comprehensive",   "comprise",   "compromise",   "compromise",   "computer",   "concede",   "conceive",   "concentrate",   "concentration",   "concept",   "conception",   "concern",   "concern",   "concerned",   "concerning",   "concert",   "conclude",   "conclusion",   "concrete",   "condemn",   "condition",   "conduct",   "conduct",   "conference",   "confess",   "confession",   "confidence",   "confident",   "confirm",   "conflict",   "confront",   "confrontation",   "confuse",   "confusion",   "Congress",   "congressional",   "connect",   "connection",   "conscience",   "conscious",   "consciousness",   "consecutive",   "consensus",   "consent",   "consequence",   "consequently",   "conservation",   "conservative",   "conservative",   "consider",   "considerable",   "considerably",   "consideration",   "consist",   "consistent",   "consistently",   "conspiracy",   "constant",   "constantly",   "constitute",   "constitution",   "constitutional",   "constraint",   "construct",   "construction",   "consult",   "consultant",   "consume",   "consumer",   "consumption",   "contact",   "contact",   "contain",   "container",   "contemplate",   "contemporary",   "contend",   "content",   "content",   "contest",   "context",   "continent",   "continue",   "continued",   "continuing",   "continuous",   "contract",   "contractor",   "contrast",   "contribute",   "contribution",   "contributor",   "control",   "control",   "controversial",   "controversy",   "convenience",   "convention",   "conventional",   "conversation",   "conversion",   "convert",   "convey",   "convict",   "conviction",   "convince",   "convinced",   "cook",   "cook",   "cookie",   "cooking",   "cool",   "cool",   "cooperate",   "cooperation",   "cooperative",   "coordinate",   "coordinator",   "cop",   "cope",   "copy",   "copy",   "cord",   "core",   "corn",   "corner",   "corporate",   "corporation",   "correct",   "correct",   "correctly",   "correlation",   "correspondent",   "corridor",   "corruption",   "cost",   "cost",   "costly",   "costume",   "cottage",   "cotton",   "couch",   "could",   "council",   "counsel",   "counseling",   "counselor",   "count",   "count",   "counter",   "counter",   "counterpart",   "country",   "county",   "coup",   "couple",   "courage",   "course",   "course",   "court",   "courtroom",   "cousin",   "cover",   "cover",   "coverage",   "cow",   "crack",   "crack",   "craft",   "crash",   "crash",   "crawl",   "crazy",   "cream",   "create",   "creation",   "creative",   "creativity",   "creature",   "credibility",   "credit",   "credit",   "crew",   "crime",   "criminal",   "criminal",   "crisis",   "criteria",   "critic",   "critical",   "criticism",   "criticize",   "crop",   "cross",   "cross",   "crowd",   "crowd",   "crowded",   "crucial",   "cruel",   "cruise",   "crush",   "cry",   "cry",   "crystal",   "Cuban",   "cue",   "cultural",   "culture",   "cup",   "cure",   "cure",   "curiosity",   "curious",   "currency",   "current",   "currently",   "curriculum",   "curtain",   "curve",   "custody",   "custom",   "customer",   "cut",   "cut",   "cute",   "cycle",   "dad",   "daily",   "daily",   "dam",   "damage",   "damage",   "damn",   "dance",   "dance",   "dancer",   "dancing",   "danger",   "dangerous",   "dare",   "dark",   "dark",   "darkness",   "data",   "database",   "date",   "date",   "daughter",   "dawn",   "day",   "dead",   "deadline",   "deadly",   "deal",   "deal",   "dealer",   "dear",   "death",   "debate",   "debate",   "debris",   "debt",   "debut",   "decade",   "decent",   "decide",   "decision",   "deck",   "declare",   "decline",   "decline",   "decorate",   "decrease",   "dedicate",   "deem",   "deep",   "deep",   "deeply",   "deer",   "defeat",   "defeat",   "defend",   "defendant",   "defender",   "defense",   "defensive",   "deficit",   "define",   "definitely",   "definition",   "degree",   "delay",   "delay",   "deliberately",   "delicate",   "delight",   "deliver",   "delivery",   "demand",   "demand",   "democracy",   "Democrat",   "democratic",   "demographic",   "demonstrate",   "demonstration",   "denial",   "dense",   "density",   "deny",   "depart",   "department",   "departure",   "depend",   "dependent",   "depending",   "depict",   "deploy",   "deposit",   "depressed",   "depression",   "depth",   "deputy",   "derive",   "descend",   "describe",   "description",   "desert",   "deserve",   "design",   "design",   "designer",   "desire",   "desire",   "desk",   "desperate",   "desperately",   "despite",   "dessert",   "destination",   "destroy",   "destruction",   "detail",   "detailed",   "detect",   "detective",   "determination",   "determine",   "devastating",   "develop",   "developer",   "developing",   "development",   "developmental",   "device",   "devil",   "devote",   "diabetes",   "diagnose",   "diagnosis",   "dialogue",   "diamond",   "diary",   "dictate",   "die",   "diet",   "differ",   "difference",   "different",   "differently",   "difficult",   "difficulty",   "dig",   "digital",   "dignity",   "dilemma",   "dimension",   "diminish",   "dining",   "dinner",   "dip",   "diplomat",   "diplomatic",   "direct",   "direct",   "direction",   "directly",   "director",   "dirt",   "dirty",   "disability",   "disabled",   "disagree",   "disappear",   "disappointed",   "disappointment",   "disaster",   "disc",   "discipline",   "disclose",   "discount",   "discourage",   "discourse",   "discover",   "discovery",   "discrimination",   "discuss",   "discussion",   "disease",   "dish",   "disk",   "dismiss",   "disorder",   "display",   "display",   "dispute",   "dissolve",   "distance",   "distant",   "distinct",   "distinction",   "distinctive",   "distinguish",   "distract",   "distribute",   "distribution",   "district",   "disturb",   "disturbing",   "diverse",   "diversity",   "divide",   "divine",   "division",   "divorce",   "divorce",   "DNA",   "do",   "dock",   "doctor",   "doctrine",   "document",   "document",   "documentary",   "dog",   "doll",   "domain",   "domestic",   "dominant",   "dominate",   "donate",   "donation",   "donor",   "door",   "doorway",   "dose",   "dot",   "double",   "double",   "doubt",   "doubt",   "dough",   "down",   "down",   "downtown",   "downtown",   "dozen",   "draft",   "draft",   "drag",   "drain",   "drama",   "dramatic",   "dramatically",   "draw",   "drawer",   "drawing",   "dream",   "dream",   "dress",   "dress",   "dried",   "drift",   "drill",   "drink",   "drink",   "drinking",   "drive",   "drive",   "driver",   "driveway",   "driving",   "drop",   "drop",   "drown",   "drug",   "drum",   "drunk",   "dry",   "dry",   "duck",   "due",   "due",   "dumb",   "dump",   "during",   "dust",   "Dutch",   "duty",   "dying",   "dynamic",   "dynamics",   "e-mail",   "each",   "each",   "eager",   "ear",   "early",   "early",   "earn",   "earnings",   "earth",   "earthquake",   "ease",   "ease",   "easily",   "east",   "eastern",   "easy",   "easy",   "eat",   "eating",   "echo",   "ecological",   "economic",   "economically",   "economics",   "economist",   "economy",   "ecosystem",   "edge",   "edit",   "edition",   "editor",   "educate",   "education",   "educational",   "educator",   "effect",   "effective",   "effectively",   "effectiveness",   "efficiency",   "efficient",   "effort",   "egg",   "ego",   "eight",   "eighth",   "either",   "either",   "elaborate",   "elbow",   "elder",   "elderly",   "elect",   "election",   "electric",   "electrical",   "electricity",   "electronic",   "electronics",   "elegant",   "element",   "elementary",   "elephant",   "elevator",   "eleven",   "eligible",   "eliminate",   "elite",   "else",   "elsewhere",   "embarrassed",   "embrace",   "emerge",   "emergency",   "emerging",   "emission",   "emotion",   "emotional",   "emotionally",   "emphasis",   "emphasize",   "empire",   "employ",   "employee",   "employer",   "employment",   "empty",   "enable",   "enact",   "encounter",   "encounter",   "encourage",   "encouraging",   "end",   "end",   "endless",   "endorse",   "endure",   "enemy",   "energy",   "enforce",   "enforcement",   "engage",   "engagement",   "engine",   "engineer",   "engineering",   "English",   "English",   "enhance",   "enjoy",   "enormous",   "enough",   "enough",   "enroll",   "ensure",   "enter",   "enterprise",   "entertainment",   "enthusiasm",   "entire",   "entirely",   "entitle",   "entity",   "entrance",   "entrepreneur",   "entry",   "envelope",   "environment",   "environmental",   "envision",   "epidemic",   "episode",   "equal",   "equality",   "equally",   "equation",   "equip",   "equipment",   "equity",   "equivalent",   "era",   "error",   "escape",   "escape",   "especially",   "essay",   "essence",   "essential",   "essentially",   "establish",   "establishment",   "estate",   "estimate",   "estimate",   "estimated",   "etc",   "ethical",   "ethics",   "ethnic",   "European",   "European",   "evaluate",   "evaluation",   "even",   "even",   "evening",   "event",   "eventually",   "ever",   "every",   "everybody",   "everyday",   "everyone",   "everything",   "everywhere",   "evidence",   "evident",   "evil",   "evil",   "evolution",   "evolve",   "exact",   "exactly",   "exam",   "examination",   "examine",   "example",   "exceed",   "excellent",   "except",   "except",   "exception",   "excessive",   "exchange",   "exchange",   "excited",   "excitement",   "exciting",   "exclude",   "exclusive",   "exclusively",   "excuse",   "excuse",   "execute",   "execution",   "executive",   "exercise",   "exercise",   "exhaust",   "exhibit",   "exhibit",   "exhibition",   "exist",   "existence",   "existing",   "exit",   "exotic",   "expand",   "expansion",   "expect",   "expectation",   "expected",   "expedition",   "expense",   "expensive",   "experience",   "experience",   "experienced",   "experiment",   "experimental",   "expert",   "expertise",   "explain",   "explanation",   "explicit",   "explode",   "exploit",   "exploration",   "explore",   "explosion",   "export",   "expose",   "exposure",   "express",   "expression",   "extend",   "extended",   "extension",   "extensive",   "extent",   "external",   "extra",   "extraordinary",   "extreme",   "extremely",   "eye",   "eyebrow",   "fabric",   "face",   "face",   "facilitate",   "facility",   "fact",   "factor",   "factory",   "faculty",   "fade",   "fail",   "failure",   "faint",   "fair",   "fairly",   "faith",   "fall",   "fall",   "false",   "fame",   "familiar",   "family",   "famous",   "fan",   "fantastic",   "fantasy",   "far",   "far",   "far",   "fare",   "farm",   "farmer",   "fascinating",   "fashion",   "fast",   "fast",   "faster",   "fat",   "fat",   "fatal",   "fate",   "father",   "fatigue",   "fault",   "favor",   "favor",   "favor",   "favorable",   "favorite",   "favorite",   "fear",   "fear",   "feather",   "feature",   "feature",   "federal",   "fee",   "feed",   "feedback",   "feel",   "feel",   "feeling",   "fellow",   "fellow",   "female",   "female",   "feminist",   "fence",   "festival",   "fever",   "few",   "fewer",   "fiber",   "fiction",   "field",   "fierce",   "fifteen",   "fifth",   "fifty",   "fight",   "fight",   "fighter",   "fighting",   "figure",   "figure",   "file",   "file",   "fill",   "film",   "filter",   "final",   "final",   "finally",   "finance",   "finance",   "financial",   "find",   "finding",   "fine",   "finger",   "finish",   "finish",   "fire",   "fire",   "firm",   "firm",   "firmly",   "first",   "first",   "fiscal",   "fish",   "fish",   "fisherman",   "fishing",   "fist",   "fit",   "fit",   "fitness",   "five",   "fix",   "fixed",   "flag",   "flame",   "flash",   "flash",   "flat",   "flavor",   "flee",   "fleet",   "flesh",   "flexibility",   "flexible",   "flight",   "flip",   "float",   "flood",   "flood",   "floor",   "flour",   "flow",   "flow",   "flower",   "fluid",   "fly",   "fly",   "flying",   "focus",   "focus",   "fog",   "fold",   "folk",   "follow",   "following",   "food",   "fool",   "foot",   "football",   "for",   "for",   "forbid",   "force",   "force",   "forehead",   "foreign",   "foreigner",   "forest",   "forever",   "forget",   "forgive",   "fork",   "form",   "form",   "formal",   "format",   "formation",   "former",   "formerly",   "formula",   "forth",   "fortunately",   "fortune",   "forty",   "forum",   "forward",   "foster",   "found",   "foundation",   "founder",   "four",   "fourth",   "fraction",   "fragile",   "fragment",   "frame",   "frame",   "framework",   "franchise",   "frankly",   "fraud",   "free",   "free",   "freedom",   "freely",   "freeze",   "French",   "French",   "frequency",   "frequent",   "frequently",   "fresh",   "freshman",   "friend",   "friendly",   "friendship",   "from",   "front",   "front",   "front",   "frontier",   "frown",   "frozen",   "fruit",   "frustrate",   "frustration",   "fucking",   "fuel",   "full",   "full-time",   "fully",   "fun",   "fun",   "function",   "function",   "functional",   "fund",   "fund",   "fundamental",   "funding",   "funeral",   "funny",   "fur",   "furniture",   "furthermore",   "future",   "future",   "gain",   "gain",   "galaxy",   "gallery",   "game",   "gang",   "gap",   "garage",   "garbage",   "garden",   "garlic",   "gas",   "gasoline",   "gate",   "gather",   "gathering",   "gay",   "gaze",   "gaze",   "gear",   "gender",   "gene",   "general",   "general",   "general",   "generally",   "generate",   "generation",   "generous",   "genetic",   "genius",   "genre",   "gentle",   "gentleman",   "gently",   "genuine",   "German",   "German",   "gesture",   "get",   "ghost",   "giant",   "giant",   "gift",   "gifted",   "girl",   "girlfriend",   "give",   "given",   "glad",   "glance",   "glance",   "glass",   "glimpse",   "global",   "globe",   "glory",   "glove",   "go",   "goal",   "goat",   "God",   "gold",   "golden",   "golf",   "good",   "good",   "govern",   "government",   "governor",   "grab",   "grace",   "grade",   "gradually",   "graduate",   "graduate",   "graduation",   "grain",   "grand",   "grandchild",   "grandfather",   "grandmother",   "grandparent",   "grant",   "grant",   "grape",   "grasp",   "grass",   "grateful",   "grave",   "gravity",   "gray",   "great",   "greatest",   "greatly",   "Greek",   "green",   "green",   "greet",   "grief",   "grin",   "grin",   "grip",   "grocery",   "gross",   "ground",   "group",   "grow",   "growing",   "growth",   "guarantee",   "guarantee",   "guard",   "guard",   "guess",   "guest",   "guidance",   "guide",   "guide",   "guideline",   "guilt",   "guilty",   "guitar",   "gun",   "gut",   "guy",   "gym",   "ha",   "habit",   "habitat",   "hair",   "half",   "half",   "halfway",   "hall",   "hallway",   "hand",   "hand",   "handful",   "handle",   "handle",   "handsome",   "hang",   "happen",   "happily",   "happiness",   "happy",   "harassment",   "hard",   "hard",   "hardly",   "hardware",   "harm",   "harm",   "harmony",   "harsh",   "harvest",   "harvest",   "hat",   "hate",   "haul",   "have",   "hay",   "hazard",   "he",   "head",   "head",   "headache",   "headline",   "headquarters",   "heal",   "health",   "healthy",   "hear",   "hearing",   "heart",   "heat",   "heat",   "heaven",   "heavily",   "heavy",   "heel",   "height",   "helicopter",   "hell",   "hello",   "helmet",   "help",   "help",   "helpful",   "hence",   "her",   "her",   "herb",   "here",   "heritage",   "hero",   "hers",   "herself",   "hesitate",   "hey",   "hi",   "hidden",   "hide",   "high",   "high",   "high-tech",   "highlight",   "highly",   "highway",   "hike",   "hill",   "him",   "himself",   "hint",   "hip",   "hire",   "his",   "his",   "Hispanic",   "historian",   "historic",   "historical",   "historically",   "history",   "hit",   "hit",   "hockey",   "hold",   "hold",   "hole",   "holiday",   "holy",   "home",   "home",   "homeland",   "homeless",   "homework",   "honest",   "honestly",   "honey",   "honor",   "honor",   "hook",   "hook",   "hope",   "hope",   "hopefully",   "horizon",   "hormone",   "horn",   "horrible",   "horror",   "horse",   "hospital",   "host",   "host",   "hostage",   "hostile",   "hot",   "hotel",   "hour",   "house",   "house",   "household",   "housing",   "how",   "however",   "hug",   "huge",   "huh",   "human",   "human",   "humanity",   "humor",   "hundred",   "hunger",   "hungry",   "hunt",   "hunter",   "hunting",   "hurricane",   "hurry",   "hurt",   "husband",   "hypothesis",   "I",   "ice",   "icon",   "idea",   "ideal",   "ideal",   "identical",   "identification",   "identify",   "identity",   "ideological",   "ideology",   "ie",   "if",   "ignore",   "ill",   "illegal",   "illness",   "illusion",   "illustrate",   "image",   "imagination",   "imagine",   "immediate",   "immediately",   "immigrant",   "immigration",   "immune",   "impact",   "implement",   "implementation",   "implication",   "imply",   "import",   "importance",   "important",   "importantly",   "impose",   "impossible",   "impress",   "impression",   "impressive",   "improve",   "improved",   "improvement",   "impulse",   "in",   "in",   "in",   "incentive",   "incident",   "include",   "including",   "income",   "incorporate",   "increase",   "increase",   "increased",   "increasing",   "increasingly",   "incredible",   "incredibly",   "indeed",   "independence",   "independent",   "index",   "Indian",   "Indian",   "indicate",   "indication",   "indicator",   "indigenous",   "individual",   "individual",   "industrial",   "industry",   "inevitable",   "inevitably",   "infant",   "infection",   "inflation",   "influence",   "influence",   "influential",   "inform",   "informal",   "information",   "infrastructure",   "ingredient",   "inherent",   "inherit",   "initial",   "initially",   "initiate",   "initiative",   "injure",   "injury",   "inmate",   "inner",   "innocent",   "innovation",   "innovative",   "input",   "inquiry",   "insect",   "insert",   "inside",   "inside",   "inside",   "insight",   "insist",   "inspection",   "inspector",   "inspiration",   "inspire",   "install",   "installation",   "instance",   "instant",   "instant",   "instantly",   "instead",   "instead",   "instinct",   "institution",   "institutional",   "instruct",   "instruction",   "instructional",   "instructor",   "instrument",   "insurance",   "intact",   "integrate",   "integrated",   "integration",   "integrity",   "intellectual",   "intellectual",   "intelligence",   "intelligent",   "intend",   "intense",   "intensity",   "intent",   "intention",   "interact",   "interaction",   "interest",   "interested",   "interesting",   "interfere",   "interior",   "interior",   "internal",   "international",   "Internet",   "interpret",   "interpretation",   "interrupt",   "interval",   "intervention",   "interview",   "interview",   "intimate",   "into",   "introduce",   "introduction",   "invade",   "invasion",   "invent",   "invention",   "inventory",   "invest",   "investigate",   "investigation",   "investigator",   "investment",   "investor",   "invisible",   "invitation",   "invite",   "involve",   "involved",   "involvement",   "Iraqi",   "Irish",   "iron",   "ironically",   "irony",   "Islam",   "Islamic",   "island",   "isolate",   "isolated",   "isolation",   "Israeli",   "Israeli",   "issue",   "issue",   "it",   "Italian",   "item",   "its",   "itself",   "jacket",   "jail",   "Japanese",   "Japanese",   "jar",   "jaw",   "jazz",   "jeans",   "jet",   "Jew",   "jewelry",   "Jewish",   "job",   "join",   "joint",   "joke",   "joke",   "journal",   "journalism",   "journalist",   "journey",   "joy",   "judge",   "judge",   "judgment",   "judicial",   "juice",   "jump",   "jump",   "jungle",   "junior",   "jurisdiction",   "juror",   "jury",   "just",   "just",   "justice",   "justify",   "keep",   "key",   "key",   "kick",   "kid",   "kid",   "kill",   "killer",   "killing",   "kind",   "kind",   "king",   "kingdom",   "kiss",   "kiss",   "kit",   "kitchen",   "knee",   "kneel",   "knife",   "knock",   "know",   "knowledge",   "known",   "Korean",   "lab",   "label",   "label",   "labor",   "laboratory",   "lack",   "lack",   "ladder",   "lady",   "lake",   "lamp",   "land",   "land",   "landing",   "landmark",   "landscape",   "lane",   "language",   "lap",   "large",   "largely",   "laser",   "last",   "last",   "last",   "late",   "late",   "lately",   "later",   "later",   "Latin",   "latter",   "laugh",   "laugh",   "laughter",   "launch",   "launch",   "laundry",   "law",   "lawmaker",   "lawn",   "lawsuit",   "lawyer",   "lay",   "layer",   "lead",   "lead",   "leader",   "leadership",   "leading",   "leaf",   "league",   "lean",   "leap",   "learn",   "learning",   "least",   "leather",   "leave",   "leave",   "lecture",   "left",   "leg",   "legacy",   "legal",   "legally",   "legend",   "legislation",   "legislative",   "legislator",   "legislature",   "legitimate",   "lemon",   "lend",   "length",   "lens",   "less",   "less",   "lesson",   "let",   "letter",   "level",   "level",   "liability",   "liberal",   "liberal",   "liberty",   "library",   "license",   "lid",   "lie",   "lie",   "life",   "lifestyle",   "lifetime",   "lift",   "light",   "light",   "light",   "light",   "lighting",   "lightly",   "lightning",   "like",   "like",   "like",   "like",   "like",   "likelihood",   "likely",   "likely",   "likewise",   "limb",   "limit",   "limit",   "limitation",   "limited",   "line",   "line",   "link",   "link",   "lion",   "lip",   "liquid",   "liquid",   "list",   "list",   "listen",   "listener",   "literally",   "literary",   "literature",   "little",   "little",   "little",   "live",   "live",   "liver",   "living",   "living",   "load",   "load",   "loan",   "lobby",   "local",   "locate",   "location",   "lock",   "lock",   "log",   "logic",   "logical",   "lonely",   "long",   "long",   "long",   "long-term",   "longtime",   "look",   "look",   "loop",   "loose",   "lose",   "loss",   "lost",   "lot",   "lots",   "loud",   "loud",   "love",   "love",   "lovely",   "lover",   "low",   "low",   "lower",   "loyal",   "loyalty",   "luck",   "lucky",   "lunch",   "lung",   "machine",   "mad",   "magazine",   "magic",   "magic",   "magnetic",   "magnitude",   "mail",   "main",   "mainly",   "mainstream",   "maintain",   "maintenance",   "major",   "major",   "majority",   "make",   "maker",   "makeup",   "male",   "male",   "mall",   "man",   "manage",   "management",   "manager",   "managing",   "mandate",   "manipulate",   "manner",   "mansion",   "manual",   "manufacturer",   "manufacturing",   "many",   "map",   "marble",   "march",   "margin",   "marine",   "mark",   "mark",   "marker",   "market",   "market",   "marketing",   "marketplace",   "marriage",   "married",   "marry",   "mask",   "mass",   "mass",   "massive",   "master",   "match",   "match",   "mate",   "material",   "math",   "mathematics",   "matter",   "matter",   "matter",   "maximum",   "may",   "maybe",   "mayor",   "me",   "meal",   "mean",   "mean",   "mean",   "meaning",   "meaningful",   "meantime",   "meanwhile",   "measure",   "measure",   "measurement",   "meat",   "mechanic",   "mechanical",   "mechanism",   "medal",   "media",   "medical",   "medication",   "medicine",   "medium",   "medium",   "meet",   "meeting",   "melt",   "member",   "membership",   "memory",   "mental",   "mentally",   "mention",   "mention",   "mentor",   "menu",   "merchant",   "mere",   "merely",   "merit",   "mess",   "message",   "metal",   "metaphor",   "meter",   "method",   "metropolitan",   "Mexican",   "middle",   "middle",   "middle-class",   "midnight",   "midst",   "might",   "migration",   "mild",   "military",   "military",   "milk",   "mill",   "million",   "mind",   "mind",   "mine",   "mine",   "mineral",   "minimal",   "minimize",   "minimum",   "minimum",   "minister",   "ministry",   "minor",   "minority",   "minute",   "miracle",   "mirror",   "miss",   "missile",   "missing",   "mission",   "missionary",   "mistake",   "mix",   "mix",   "mixed",   "mixture",   "mm-hmm",   "mobile",   "mode",   "model",   "model",   "moderate",   "modern",   "modest",   "modify",   "molecule",   "mom",   "moment",   "momentum",   "money",   "monitor",   "monitor",   "monkey",   "monster",   "month",   "monthly",   "monument",   "mood",   "moon",   "moral",   "more",   "more",   "moreover",   "morning",   "mortality",   "mortgage",   "most",   "most",   "mostly",   "mother",   "motion",   "motivate",   "motivation",   "motive",   "motor",   "mount",   "mountain",   "mouse",   "mouth",   "move",   "move",   "movement",   "movie",   "Mr",   "Mrs",   "Ms",   "much",   "much",   "mud",   "multiple",   "municipal",   "murder",   "murder",   "muscle",   "museum",   "mushroom",   "music",   "musical",   "musician",   "Muslim",   "Muslim",   "must",   "mutter",   "mutual",   "my",   "myself",   "mysterious",   "mystery",   "myth",   "n't",   "nail",   "naked",   "name",   "name",   "narrative",   "narrow",   "nasty",   "nation",   "national",   "nationwide",   "native",   "natural",   "naturally",   "nature",   "naval",   "near",   "near",   "near",   "nearby",   "nearby",   "nearly",   "neat",   "necessarily",   "necessary",   "necessity",   "neck",   "need",   "need",   "needle",   "negative",   "negotiate",   "negotiation",   "neighbor",   "neighborhood",   "neighboring",   "neither",   "neither",   "nerve",   "nervous",   "nest",   "net",   "net",   "network",   "neutral",   "never",   "nevertheless",   "new",   "newly",   "news",   "newspaper",   "next",   "next",   "nice",   "night",   "nightmare",   "nine",   "no",   "no",   "no",   "no",   "no",   "nobody",   "nod",   "noise",   "nomination",   "nominee",   "none",   "nonetheless",   "nonprofit",   "noon",   "nor",   "norm",   "normal",   "normally",   "north",   "northeast",   "northern",   "northwest",   "nose",   "not",   "not",   "note",   "note",   "notebook",   "nothing",   "notice",   "notice",   "notion",   "novel",   "now",   "now",   "nowhere",   "nuclear",   "number",   "numerous",   "nurse",   "nut",   "nutrient",   "o'clock",   "oak",   "object",   "object",   "objection",   "objective",   "obligation",   "observation",   "observe",   "observer",   "obstacle",   "obtain",   "obvious",   "obviously",   "occasion",   "occasional",   "occasionally",   "occupation",   "occupy",   "occur",   "ocean",   "odd",   "odds",   "of",   "off",   "off",   "offender",   "offense",   "offensive",   "offer",   "offer",   "offering",   "office",   "officer",   "official",   "official",   "officially",   "often",   "oh",   "oil",   "ok",   "OK",   "okay",   "okay",   "old",   "old-fashioned",   "Olympic",   "Olympics",   "on",   "on",   "once",   "once",   "one",   "one",   "one",   "one-third",   "ongoing",   "onion",   "online",   "online",   "only",   "only",   "onto",   "open",   "open",   "opening",   "openly",   "opera",   "operate",   "operating",   "operation",   "operator",   "opinion",   "opponent",   "opportunity",   "oppose",   "opposed",   "opposite",   "opposition",   "opt",   "optimistic",   "option",   "or",   "oral",   "orange",   "orange",   "orbit",   "order",   "order",   "ordinary",   "organ",   "organic",   "organism",   "organization",   "organizational",   "organize",   "organized",   "orientation",   "origin",   "original",   "originally",   "other",   "other",   "other",   "others",   "otherwise",   "ought",   "our",   "ours",   "ourselves",   "out",   "out",   "outcome",   "outdoor",   "outer",   "outfit",   "outlet",   "outline",   "output",   "outside",   "outside",   "outside",   "outsider",   "outstanding",   "oven",   "over",   "over",   "overall",   "overall",   "overcome",   "overlook",   "overnight",   "oversee",   "overwhelm",   "overwhelming",   "owe",   "own",   "own",   "owner",   "ownership",   "oxygen",   "pace",   "pack",   "pack",   "package",   "pad",   "page",   "pain",   "painful",   "paint",   "paint",   "painter",   "painting",   "pair",   "palace",   "pale",   "Palestinian",   "Palestinian",   "palm",   "pan",   "panel",   "panic",   "pant",   "paper",   "parade",   "parent",   "parental",   "parish",   "park",   "park",   "parking",   "part",   "part",   "part",   "partial",   "partially",   "participant",   "participate",   "participation",   "particle",   "particular",   "particular",   "particularly",   "partly",   "partner",   "partnership",   "party",   "pass",   "pass",   "passage",   "passenger",   "passing",   "passion",   "past",   "past",   "past",   "past",   "pasta",   "pastor",   "pat",   "patch",   "patent",   "path",   "patience",   "patient",   "patient",   "patrol",   "patron",   "pattern",   "pause",   "pause",   "pay",   "pay",   "payment",   "PC",   "peace",   "peaceful",   "peak",   "peanut",   "peasant",   "peel",   "peer",   "peer",   "pen",   "penalty",   "pencil",   "pension",   "people",   "pepper",   "per",   "perceive",   "perceived",   "percentage",   "perception",   "perfect",   "perfectly",   "perform",   "performance",   "performer",   "perhaps",   "period",   "permanent",   "permission",   "permit",   "permit",   "Persian",   "persist",   "person",   "personal",   "personality",   "personally",   "personnel",   "perspective",   "persuade",   "pet",   "phase",   "phenomenon",   "philosophical",   "philosophy",   "phone",   "photo",   "photograph",   "photograph",   "photographer",   "photography",   "phrase",   "physical",   "physically",   "physician",   "physics",   "piano",   "pick",   "pickup",   "picture",   "picture",   "pie",   "piece",   "pig",   "pile",   "pile",   "pill",   "pillow",   "pilot",   "pin",   "pine",   "pink",   "pioneer",   "pipe",   "pistol",   "pit",   "pitch",   "pitch",   "pitcher",   "pizza",   "place",   "place",   "placement",   "plain",   "plain",   "plaintiff",   "plan",   "plan",   "plane",   "planet",   "planner",   "planning",   "plant",   "plant",   "plastic",   "plate",   "platform",   "play",   "play",   "player",   "playoff",   "plea",   "plead",   "pleasant",   "please",   "please",   "pleased",   "pleasure",   "plenty",   "plot",   "plunge",   "plus",   "PM",   "pocket",   "poem",   "poet",   "poetry",   "point",   "point",   "poke",   "pole",   "police",   "policeman",   "policy",   "political",   "politically",   "politician",   "politics",   "poll",   "pollution",   "pond",   "pool",   "poor",   "pop",   "pop",   "popular",   "popularity",   "population",   "porch",   "pork",   "port",   "portfolio",   "portion",   "portrait",   "portray",   "pose",   "position",   "position",   "positive",   "possess",   "possession",   "possibility",   "possible",   "possibly",   "post",   "post",   "poster",   "pot",   "potato",   "potential",   "potential",   "potentially",   "pound",   "pound",   "pour",   "poverty",   "powder",   "power",   "powerful",   "practical",   "practically",   "practice",   "practice",   "practitioner",   "praise",   "praise",   "pray",   "prayer",   "preach",   "precious",   "precise",   "precisely",   "predator",   "predict",   "prediction",   "prefer",   "preference",   "pregnancy",   "pregnant",   "preliminary",   "premise",   "premium",   "preparation",   "prepare",   "prescription",   "presence",   "present",   "present",   "present",   "presentation",   "preserve",   "presidency",   "president",   "presidential",   "press",   "press",   "pressure",   "presumably",   "pretend",   "pretty",   "pretty",   "prevail",   "prevent",   "prevention",   "previous",   "previously",   "price",   "pride",   "priest",   "primarily",   "primary",   "primary",   "prime",   "principal",   "principal",   "principle",   "print",   "print",   "prior",   "prior",   "priority",   "prison",   "prisoner",   "privacy",   "private",   "privately",   "privilege",   "prize",   "pro",   "pro",   "probably",   "problem",   "procedure",   "proceed",   "process",   "process",   "processing",   "processor",   "produce",   "producer",   "product",   "production",   "productive",   "productivity",   "profession",   "professional",   "professional",   "professor",   "profile",   "profit",   "profound",   "program",   "program",   "programming",   "progress",   "progressive",   "prohibit",   "project",   "project",   "projection",   "prominent",   "promise",   "promise",   "promising",   "promote",   "promotion",   "prompt",   "proof",   "proper",   "properly",   "property",   "proportion",   "proposal",   "propose",   "proposed",   "prosecution",   "prosecutor",   "prospect",   "protect",   "protection",   "protective",   "protein",   "protest",   "protest",   "protocol",   "proud",   "prove",   "provide",   "provided",   "provider",   "province",   "provision",   "provoke",   "psychological",   "psychologist",   "psychology",   "public",   "public",   "public",   "publication",   "publicity",   "publicly",   "publish",   "publisher",   "pull",   "pulse",   "pump",   "pump",   "punch",   "punish",   "punishment",   "purchase",   "purchase",   "pure",   "purple",   "purpose",   "purse",   "pursue",   "pursuit",   "push",   "put",   "puzzle",   "qualify",   "quality",   "quantity",   "quarter",   "quarterback",   "queen",   "quest",   "question",   "question",   "questionnaire",   "quick",   "quickly",   "quiet",   "quietly",   "quit",   "quite",   "quote",   "quote",   "rabbit",   "race",   "race",   "racial",   "racism",   "rack",   "radar",   "radiation",   "radical",   "radio",   "rage",   "rail",   "railroad",   "rain",   "rain",   "raise",   "rally",   "ranch",   "random",   "range",   "range",   "rank",   "rank",   "rape",   "rapid",   "rapidly",   "rare",   "rarely",   "rat",   "rate",   "rate",   "rather",   "rather",   "rather",   "rating",   "ratio",   "rational",   "raw",   "re",   "reach",   "reach",   "react",   "reaction",   "read",   "reader",   "readily",   "reading",   "ready",   "real",   "realistic",   "reality",   "realize",   "really",   "realm",   "rear",   "reason",   "reasonable",   "rebel",   "rebuild",   "recall",   "receive",   "receiver",   "recent",   "recently",   "reception",   "recession",   "recipe",   "recipient",   "recognition",   "recognize",   "recommend",   "recommendation",   "record",   "record",   "recording",   "recover",   "recovery",   "recruit",   "red",   "reduce",   "reduction",   "refer",   "reference",   "reflect",   "reflection",   "reform",   "refrigerator",   "refuge",   "refugee",   "refuse",   "regain",   "regard",   "regard",   "regard",   "regarding",   "regardless",   "regime",   "region",   "regional",   "register",   "regret",   "regular",   "regularly",   "regulate",   "regulation",   "regulator",   "regulatory",   "rehabilitation",   "reinforce",   "reject",   "relate",   "related",   "relation",   "relationship",   "relative",   "relative",   "relatively",   "relax",   "release",   "release",   "relevant",   "reliability",   "reliable",   "relief",   "relieve",   "religion",   "religious",   "reluctant",   "rely",   "remain",   "remaining",   "remark",   "remark",   "remarkable",   "remember",   "remind",   "reminder",   "remote",   "removal",   "remove",   "render",   "rent",   "rent",   "rental",   "repair",   "repair",   "repeat",   "repeatedly",   "replace",   "replacement",   "reply",   "report",   "report",   "reportedly",   "reporter",   "reporting",   "represent",   "representation",   "representative",   "representative",   "republic",   "Republican",   "republican",   "reputation",   "request",   "request",   "require",   "required",   "requirement",   "rescue",   "rescue",   "research",   "research",   "researcher",   "resemble",   "reservation",   "reserve",   "reserve",   "residence",   "resident",   "residential",   "resign",   "resist",   "resistance",   "resolution",   "resolve",   "resort",   "resource",   "respect",   "respect",   "respect",   "respectively",   "respond",   "respondent",   "response",   "response",   "responsibility",   "responsible",   "rest",   "rest",   "restaurant",   "restore",   "restrict",   "restriction",   "result",   "result",   "resume",   "retail",   "retailer",   "retain",   "retire",   "retired",   "retirement",   "retreat",   "return",   "return",   "reveal",   "revelation",   "revenue",   "reverse",   "review",   "review",   "revolution",   "revolutionary",   "reward",   "reward",   "rhetoric",   "rhythm",   "rib",   "ribbon",   "rice",   "rich",   "rid",   "ride",   "ride",   "rider",   "ridge",   "ridiculous",   "rifle",   "right",   "right",   "right",   "rim",   "ring",   "ring",   "riot",   "rip",   "rise",   "rise",   "risk",   "risk",   "risky",   "ritual",   "rival",   "river",   "road",   "robot",   "rock",   "rock",   "rocket",   "rod",   "role",   "roll",   "roll",   "rolling",   "Roman",   "romance",   "romantic",   "roof",   "room",   "root",   "root",   "rope",   "rose",   "rough",   "roughly",   "round",   "round",   "round",   "route",   "routine",   "routinely",   "row",   "royal",   "rub",   "rubber",   "ruin",   "rule",   "rule",   "ruling",   "rumor",   "run",   "run",   "runner",   "running",   "running",   "rural",   "rush",   "rush",   "Russian",   "Russian",   "sack",   "sacred",   "sacrifice",   "sacrifice",   "sad",   "safe",   "safely",   "safety",   "sail",   "sake",   "salad",   "salary",   "sale",   "sales",   "salmon",   "salt",   "same",   "sample",   "sanction",   "sand",   "sandwich",   "satellite",   "satisfaction",   "satisfy",   "sauce",   "save",   "saving",   "say",   "scale",   "scan",   "scandal",   "scare",   "scared",   "scary",   "scatter",   "scenario",   "scene",   "scent",   "schedule",   "schedule",   "scheme",   "scholar",   "scholarship",   "school",   "science",   "scientific",   "scientist",   "scope",   "score",   "score",   "scramble",   "scratch",   "scream",   "screen",   "screen",   "screening",   "screw",   "script",   "sculpture",   "sea",   "seal",   "seal",   "search",   "search",   "season",   "seat",   "seat",   "second",   "second",   "secondary",   "secret",   "secret",   "secretary",   "section",   "sector",   "secular",   "secure",   "secure",   "security",   "see",   "seed",   "seek",   "seem",   "seemingly",   "segment",   "seize",   "seldom",   "select",   "selected",   "selection",   "self",   "self-esteem",   "sell",   "seller",   "seminar",   "Senate",   "senator",   "send",   "senior",   "senior",   "sensation",   "sense",   "sense",   "sensitive",   "sensitivity",   "sensor",   "sentence",   "sentiment",   "separate",   "separate",   "separation",   "sequence",   "series",   "serious",   "seriously",   "servant",   "serve",   "service",   "serving",   "session",   "set",   "set",   "setting",   "settle",   "settlement",   "seven",   "seventh",   "several",   "severe",   "severely",   "sex",   "sexual",   "sexuality",   "sexually",   "sexy",   "shade",   "shadow",   "shake",   "shall",   "shallow",   "shame",   "shape",   "shape",   "share",   "share",   "shared",   "shareholder",   "shark",   "sharp",   "sharply",   "she",   "shed",   "sheep",   "sheer",   "sheet",   "shelf",   "shell",   "shelter",   "shift",   "shift",   "shine",   "ship",   "ship",   "shirt",   "shit",   "shock",   "shock",   "shoe",   "shoot",   "shooting",   "shop",   "shop",   "shopping",   "shore",   "short",   "short",   "short-term",   "shortage",   "shortly",   "shorts",   "shot",   "should",   "shoulder",   "shout",   "shove",   "show",   "show",   "shower",   "shrimp",   "shrink",   "shrug",   "shut",   "shuttle",   "shy",   "sibling",   "sick",   "side",   "sidewalk",   "sigh",   "sight",   "sign",   "sign",   "signal",   "signal",   "signature",   "significance",   "significant",   "significantly",   "silence",   "silent",   "silk",   "silly",   "silver",   "similar",   "similarity",   "similarly",   "simple",   "simply",   "simultaneously",   "sin",   "since",   "since",   "since",   "sing",   "singer",   "single",   "sink",   "sink",   "sir",   "sister",   "sit",   "site",   "situation",   "six",   "sixth",   "size",   "ski",   "skill",   "skilled",   "skin",   "skip",   "skirt",   "skull",   "sky",   "slam",   "slap",   "slave",   "slavery",   "sleep",   "sleep",   "sleeve",   "slice",   "slice",   "slide",   "slide",   "slight",   "slightly",   "slip",   "slope",   "slot",   "slow",   "slow",   "slowly",   "small",   "smart",   "smell",   "smell",   "smile",   "smile",   "smoke",   "smoke",   "smooth",   "snake",   "snap",   "sneak",   "snow",   "so",   "so",   "so-called",   "soak",   "soap",   "soar",   "soccer",   "social",   "socially",   "society",   "sock",   "sodium",   "sofa",   "soft",   "soften",   "softly",   "software",   "soil",   "solar",   "soldier",   "sole",   "solely",   "solid",   "solution",   "solve",   "some",   "somebody",   "someday",   "somehow",   "someone",   "something",   "sometime",   "sometimes",   "somewhat",   "somewhere",   "son",   "song",   "soon",   "soon",   "sophisticated",   "sorry",   "sort",   "sort",   "soul",   "sound",   "sound",   "soup",   "source",   "south",   "southeast",   "southern",   "southwest",   "sovereignty",   "Soviet",   "space",   "Spanish",   "spare",   "spark",   "speak",   "speaker",   "special",   "specialist",   "specialize",   "specialty",   "species",   "specific",   "specifically",   "specify",   "spectacular",   "spectrum",   "speculate",   "speculation",   "speech",   "speed",   "speed",   "spell",   "spend",   "spending",   "sphere",   "spill",   "spin",   "spine",   "spirit",   "spiritual",   "spit",   "spite",   "split",   "spokesman",   "sponsor",   "sponsor",   "spoon",   "sport",   "spot",   "spot",   "spouse",   "spray",   "spread",   "spread",   "spring",   "spring",   "sprinkle",   "spy",   "squad",   "square",   "square",   "squeeze",   "stability",   "stable",   "stack",   "stadium",   "staff",   "stage",   "stair",   "stake",   "stance",   "stand",   "stand",   "standard",   "standard",   "standing",   "star",   "star",   "stare",   "start",   "start",   "starter",   "starting",   "state",   "state",   "statement",   "station",   "statistical",   "statistics",   "statue",   "status",   "statute",   "stay",   "stay",   "steadily",   "steady",   "steak",   "steal",   "steam",   "steel",   "steep",   "steer",   "stem",   "stem",   "step",   "step",   "stereotype",   "stick",   "stick",   "stiff",   "still",   "still",   "stimulate",   "stimulus",   "stir",   "stock",   "stomach",   "stone",   "stop",   "stop",   "storage",   "store",   "store",   "storm",   "story",   "stove",   "straight",   "straight",   "straighten",   "strain",   "strain",   "strange",   "stranger",   "strategic",   "strategy",   "straw",   "streak",   "stream",   "street",   "strength",   "strengthen",   "stress",   "stress",   "stretch",   "stretch",   "strict",   "strictly",   "strike",   "strike",   "striking",   "string",   "strip",   "strip",   "stroke",   "strong",   "strongly",   "structural",   "structure",   "struggle",   "struggle",   "student",   "studio",   "study",   "study",   "stuff",   "stuff",   "stumble",   "stupid",   "style",   "subject",   "subject",   "submit",   "subsequent",   "subsidy",   "substance",   "substantial",   "substantially",   "subtle",   "suburb",   "suburban",   "succeed",   "success",   "successful",   "successfully",   "such",   "such",   "suck",   "sudden",   "sudden",   "suddenly",   "sue",   "suffer",   "suffering",   "sufficient",   "sugar",   "suggest",   "suggestion",   "suicide",   "suit",   "suit",   "suitable",   "suite",   "sum",   "summary",   "summer",   "summit",   "sun",   "sunlight",   "sunny",   "super",   "superior",   "supermarket",   "supervisor",   "supplier",   "supply",   "supply",   "support",   "support",   "supporter",   "supportive",   "suppose",   "supposed",   "supposedly",   "Supreme",   "sure",   "sure",   "surely",   "surface",   "surgeon",   "surgery",   "surprise",   "surprise",   "surprised",   "surprising",   "surprisingly",   "surround",   "surrounding",   "surveillance",   "survey",   "survey",   "survival",   "survive",   "survivor",   "suspect",   "suspect",   "suspend",   "suspicion",   "suspicious",   "sustain",   "sustainable",   "swallow",   "swear",   "sweat",   "sweater",   "sweep",   "sweet",   "swell",   "swim",   "swimming",   "swing",   "swing",   "switch",   "switch",   "sword",   "symbol",   "symbolic",   "sympathy",   "symptom",   "syndrome",   "system",   "T-shirt",   "table",   "tablespoon",   "tackle",   "tactic",   "tag",   "tail",   "take",   "tale",   "talent",   "talented",   "talk",   "talk",   "tall",   "tank",   "tap",   "tape",   "target",   "target",   "task",   "taste",   "taste",   "tax",   "taxpayer",   "tea",   "teach",   "teacher",   "teaching",   "team",   "teammate",   "tear",   "tear",   "teaspoon",   "technical",   "technician",   "technique",   "technological",   "technology",   "teen",   "teenage",   "teenager",   "telephone",   "telescope",   "television",   "tell",   "temperature",   "temple",   "temporary",   "ten",   "tend",   "tendency",   "tender",   "tennis",   "tension",   "tent",   "term",   "terms",   "terrain",   "terrible",   "terribly",   "terrific",   "territory",   "terror",   "terrorism",   "terrorist",   "terrorist",   "test",   "test",   "testify",   "testimony",   "testing",   "text",   "textbook",   "texture",   "than",   "than",   "thank",   "thanks",   "Thanksgiving",   "that",   "that",   "that",   "the",   "theater",   "their",   "them",   "theme",   "themselves",   "then",   "theological",   "theology",   "theoretical",   "theory",   "therapist",   "therapy",   "there",   "there",   "thereby",   "therefore",   "these",   "they",   "thick",   "thigh",   "thin",   "thing",   "think",   "thinking",   "third",   "thirty",   "this",   "this",   "thoroughly",   "those",   "though",   "though",   "thought",   "thousand",   "thread",   "threat",   "threaten",   "three",   "threshold",   "thrive",   "throat",   "through",   "through",   "throughout",   "throw",   "thumb",   "thus",   "ticket",   "tide",   "tie",   "tie",   "tight",   "tight",   "tighten",   "tightly",   "tile",   "till",   "till",   "timber",   "time",   "timing",   "tiny",   "tip",   "tip",   "tire",   "tired",   "tissue",   "title",   "to",   "to",   "tobacco",   "today",   "toe",   "together",   "toilet",   "tolerance",   "tolerate",   "toll",   "tomato",   "tomorrow",   "tone",   "tongue",   "tonight",   "too",   "tool",   "tooth",   "top",   "top",   "top",   "top",   "topic",   "toss",   "total",   "total",   "totally",   "touch",   "touch",   "touchdown",   "tough",   "tour",   "tourism",   "tourist",   "tournament",   "toward",   "towards",   "towel",   "tower",   "town",   "toxic",   "toy",   "trace",   "trace",   "track",   "track",   "trade",   "trade",   "trading",   "tradition",   "traditional",   "traditionally",   "traffic",   "tragedy",   "tragic",   "trail",   "trail",   "trailer",   "train",   "train",   "trainer",   "training",   "trait",   "transaction",   "transfer",   "transfer",   "transform",   "transformation",   "transit",   "transition",   "translate",   "translation",   "transmission",   "transmit",   "transport",   "transport",   "transportation",   "trap",   "trap",   "trash",   "trauma",   "travel",   "travel",   "traveler",   "tray",   "treasure",   "treat",   "treatment",   "treaty",   "tree",   "tremendous",   "trend",   "trial",   "tribal",   "tribe",   "trick",   "trigger",   "trim",   "trip",   "triumph",   "troop",   "tropical",   "trouble",   "trouble",   "troubled",   "truck",   "true",   "truly",   "trunk",   "trust",   "trust",   "truth",   "try",   "tube",   "tuck",   "tumor",   "tune",   "tune",   "tunnel",   "turkey",   "turn",   "turn",   "TV",   "twelve",   "twentieth",   "twenty",   "twice",   "twin",   "twist",   "twist",   "two",   "two-thirds",   "type",   "typical",   "typically",   "ugly",   "uh",   "ultimate",   "ultimately",   "unable",   "uncertain",   "uncertainty",   "uncle",   "uncomfortable",   "uncover",   "under",   "under",   "undergo",   "undergraduate",   "underlying",   "undermine",   "understand",   "understanding",   "undertake",   "unemployment",   "unexpected",   "unfair",   "unfold",   "unfortunately",   "unhappy",   "uniform",   "union",   "unique",   "unit",   "unite",   "United",   "unity",   "universal",   "universe",   "university",   "unknown",   "unless",   "unlike",   "unlike",   "unlikely",   "unprecedented",   "until",   "until",   "unusual",   "up",   "up",   "update",   "upon",   "upper",   "upset",   "upset",   "upstairs",   "urban",   "urge",   "us",   "use",   "use",   "used",   "useful",   "user",   "usual",   "usually",   "utility",   "utilize",   "vacation",   "vaccine",   "vacuum",   "valid",   "validity",   "valley",   "valuable",   "value",   "value",   "van",   "vanish",   "variable",   "variation",   "variety",   "various",   "vary",   "vast",   "vegetable",   "vehicle",   "vendor",   "venture",   "verbal",   "verdict",   "version",   "versus",   "vertical",   "very",   "very",   "vessel",   "veteran",   "veteran",   "via",   "victim",   "victory",   "video",   "view",   "view",   "viewer",   "village",   "violate",   "violation",   "violence",   "violent",   "virtual",   "virtually",   "virtue",   "virus",   "visible",   "vision",   "visit",   "visit",   "visitor",   "visual",   "vital",   "vitamin",   "vocal",   "voice",   "volume",   "voluntary",   "volunteer",   "volunteer",   "vote",   "vote",   "voter",   "voting",   "vs",   "vulnerable",   "wage",   "wagon",   "waist",   "wait",   "wake",   "wake",   "walk",   "walk",   "walking",   "wall",   "wander",   "want",   "war",   "warehouse",   "warm",   "warm",   "warmth",   "warn",   "warning",   "warrior",   "wash",   "waste",   "waste",   "watch",   "watch",   "water",   "wave",   "wave",   "way",   "way",   "we",   "weak",   "weaken",   "weakness",   "wealth",   "wealthy",   "weapon",   "wear",   "weather",   "weave",   "web",   "wedding",   "weed",   "week",   "weekend",   "weekly",   "weigh",   "weight",   "weird",   "welcome",   "welcome",   "welfare",   "well",   "well",   "well-being",   "well-known",   "west",   "western",   "wet",   "whale",   "what",   "whatever",   "wheat",   "wheel",   "wheelchair",   "when",   "when",   "whenever",   "where",   "where",   "whereas",   "wherever",   "whether",   "which",   "while",   "while",   "whip",   "whisper",   "white",   "white",   "who",   "whoever",   "whole",   "whole",   "whom",   "whose",   "why",   "wide",   "widely",   "widespread",   "widow",   "wife",   "wild",   "wilderness",   "wildlife",   "will",   "will",   "willing",   "willingness",   "win",   "win",   "wind",   "wind",   "window",   "wine",   "wing",   "winner",   "winter",   "wipe",   "wire",   "wisdom",   "wise",   "wish",   "wish",   "with",   "withdraw",   "withdrawal",   "within",   "within",   "without",   "witness",   "witness",   "wolf",   "woman",   "wonder",   "wonder",   "wonderful",   "wood",   "wooden",   "word",   "work",   "work",   "worker",   "working",   "workout",   "workplace",   "works",   "workshop",   "world",   "worldwide",   "worldwide",   "worried",   "worry",   "worry",   "worth",   "worth",   "would",   "wound",   "wound",   "wow",   "wrap",   "wrist",   "write",   "writer",   "writing",   "written",   "wrong",   "wrong",   "yard",   "yeah",   "year",   "yell",   "yellow",   "yes",   "yesterday",   "yet",   "yield",   "yield",   "you",   "young",   "youngster",   "your",   "yours",   "yourself",   "youth",   "zone"];
var gFinalPuzzleAnswer = [];
var gFinalEncr;
var gTrashMessage;
var gRSAObj;


//EXPORTS~~~~~~~~~~~~~~
exports.getPuzzleInfo = function(req, res) {

    var uid = req.params.uid;
    var n = Number( req.params.n );

    //check user has credentials to view that prompt
    if (gGame.players.get(uid).ring >= n) {
      //send the prompt
      if( n >= 0){
        res.send({ prompt : gGame.rings[n]});
      }
    } else {
      //Invalid credentials
      console.log(uid + ' tried to access restricted puzzle info');
    }
};

exports.getMapInfo = function(req, res) {

    var uid =  req.params.uid ;
    //Map info isn't user specific for now.
    res.send(gOutputMap);

};

exports.getGameStatus = function(req, res) {

    var mid = Number (req.params.uid );
    var gid = Number( req.params.n );

    //game status is uid independent
    var ret = gStatus[gid];
    if (ret == null)   {
      res.send({gMapNumber,
        msg: gTrashMessage});
  }
    else   {
      ret.msg = gTrashMessage;
      res.send(ret);
    }


};

exports.join = function(req, res) {

    var name =  req.params.name;

    res.send({uid:addPlayer(name)});

};

exports.proposeSolution = function(req, res) {

    var uid = req.params.uid;
    var solution = req.params.solution;
    var correct = checkAnswer(uid,solution.trim().split(' '));
    var bonus = (correct? puzzleAnswer(uid.ring) : 'noop');
    res.send({correct});

};

exports.getActiveGame = function(req, res){
  res.send({ gameId : gGameNumber, circleCount : gRingNumber});
}

exports.trashTalk = function(req, res){

  gTrashMessage = req.params.msg;

}

exports.easyRSA = function(req, res){

  var msg = req.params.msg;
  var key = req.params.key;
  var p = req.params.p;
  var q = req.params.q;

  res.send({ data : easyRSA(msg, key,p,q)});

}

//GAME STUFF~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
newGame(gRingNumber);

function randomWordIndex(){
  return Math.floor(Math.random() * gWords.length);
}

//converts a string of all lowercase to a number-string
function stringToNum(str){
  var outstr = "";
  for(var i = 0; i < str.length; i++){
    var res = str.charCodeAt(i) - 'a'.charCodeAt(0);
    res = "" + res;
    if(res.length == 1){
      res = "0" + res;
    }
    outstr += res;
  }
  return Number(outstr);
}

//converts a num-string to a string wow! NUM MUST BE EVEN LENGTH DOG
function numToString(num){
  var outstr = "";
  for(i = 0; i<num.length;i = i + 2){
    var cut = Number(num[i] + num[i+1]);
    outstr = outstr + String.fromCharCode(cut+65);
  }
  return outstr;
}

// Starts next round of game
function newGame(ringCount) {
  gMapNumber = 0; // Update sequence number of map
  gGameNumber++; // Game sequence number
  gPlyN = {};
  gOutputMap = [];
  gSolutions = [];
  var w1 = randomWordIndex();
  gFinalPuzzleAnswer = [gWords[w1]];
  console.log(w1);

  gRSAObj = generateRSAkeys();
  var unencrypted = w1;
  gFinalEncr = toggleEncrypt(unencrypted, gRSAObj.pubkey, gRSAObj.p, gRSAObj.q);
  var rings = generateRings(ringCount);
  var players = new Map();
  //encrypt final answer



  gGame = {
    gRSAObj,
    rings,
    players,
  };
}

// Generates RSA, returning an object of p1, p2, n (?)
function generateRSAkeys(){
  var p = 0;
  var q = 0;
  var privkey = 0;
  do {
    p = Math.floor((Math.random()+1)*50000);
  } while (!isPrime(p));
  do {
    q = Math.floor((Math.random()+1)*50000);
  } while (!isPrime(q) || q==p);
  do {
    privkey = Math.floor(Math.random()*(89999) + 10000);
  } while (!isPrime(privkey));
  var phi = (p-1)*(q-1);

  var inverse = function(privkey, phi) {
    var b0 = phi
    var t;
    var q;
    var x0 = 0, x1 = 1;
    if (phi == 1) return 1;
    while (privkey > 1) {
      q = Math.floor(privkey / phi);
      t = phi, phi = privkey % phi, privkey = t;
      t = x0, x0 = x1 - q * x0, x1 = t;
    }
    if (x1 < 0) x1 += b0;
    return x1;
  }

  var pubkey = inverse(privkey, phi);
  return {p:p, q:q, privkey:privkey, pubkey:pubkey};
}

// Creates a list of puzzles representing each ring
function generateRings(ringCount){
  var rings = [];
  for(var i = 0; i < ringCount; i++){
    //Generate the answer
    var w1 = randomWordIndex();
    ans = [gWords[w1]];
    //Add a puzzle
    var puzzle = puzzleFactory.getNormalPuzzle();
    rings.push(puzzle.getPrompt(ans));
    gSolutions[i] = ans;
  }
  //Last ring
  var final = puzzleFactory.getFinalPuzzle();
  rings
    .push(final.getPrompt(gFinalEncr, gRSAObj.p, gRSAObj.q, gRSAObj.privkey));
    gSolutions[ringCount] = gFinalPuzzleAnswer;

  return rings;
}

// Returns an object containing the three words that are a puzzle's answer
// Uses the puzzle key
function puzzleAnswer(i){
  return gSolutions[i];
}

// Returns an object containing the three words that are a puzzle's answer
// Uses the puzzle key
function suppPuzzleAnswer(ringIndex){
  switch(gRingNumber - ringIndex) {
    case 2:
      return gRSAObj.p;
      break;
    case 1:
      return gRSAObj.q;
      break;
    case 0:
      return gRSAObj.privkey;
      break;
    default:
      return;
  }
}

//Checks that a given answer is equal to the correct.  Advances the user if so and returns true.
function checkAnswer(uid, ans){
  var ringNum = gGame.players.get(uid).ring;
  for (var i = 0; i < gSolutions[ringNum].length; i++){
    if (gSolutions[ringNum][i] != ans[i]){
      console.log('mismatch');
      console.log(gSolutions[ringNum][i]);
      console.log(ans[i]);
      return false;
    }
  }
  advanceUser(uid);
  return(true);
}

// Advances the user in the game
function advanceUser(uid){
  var ringNum = gGame.players.get(uid).ring;
  if (ringNum < gSolutions.length + 1){
    gGame.players.get(uid).ring++;
    incrementMap();
  } else {
    //looks like they won. WOOHOO
    gStatus[gGameNumber] = {
      winner : gGame.players.get(uid).name
    }
    newGame(gRingNumber);
  }
}

// Generates an array of name,ring pairs for data output, stores it to avoid recomp
function incrementMap(){
  gMapNumber++;
  gOutputMap = [];
  console.log(gGame.players.size);
  var i = 0;
  gGame.players.forEach(function(value,key){
    gOutputMap.push({name:value.name,ring:value.ring, });
    i++;
  });

}

//Maps up to three digits to a word
function numToWord(num){
  return gWords[num];
}

//Adds a player to the current game.
//Returns the unique name for the player for 'private' communication
function addPlayer(name){
  if(gPlyN[name]) return null;

  var ply = {};

  var num = "0000" + (Math.floor(Math.random() * 100000)).toString();
  num = num.substring(num.length - 5);
  var uid = name + num;

  ply.uid = uid;
  ply.ring = 0;
  ply.name = name;

      gGame.players.set(uid, ply);
      gPlyN[name] = true;
      incrementMap();
      return uid;

}


function getUsername(uid) {
    if (uidMap.has(uid)) {
        return uidMap.get(uid);
    }
    return "This uid does not exist.";
}

function isPrime(n) {
  if (n==leastFactor(n)) return true;
  return false;
};


function leastFactor(n){
  if (n%2==0) return 2;
  if (n%3==0) return 3;
  if (n%5==0) return 5;
  var m = Math.sqrt(n);
  for (var i=7;i<=m;i+=30) {
    if (n%i==0)      return i;
    if (n%(i+4)==0)  return i+4;
    if (n%(i+6)==0)  return i+6;
    if (n%(i+10)==0) return i+10;
    if (n%(i+12)==0) return i+12;
    if (n%(i+16)==0) return i+16;
    if (n%(i+22)==0) return i+22;
    if (n%(i+24)==0) return i+24;
  }
  return n;
};

function toggleEncrypt(n, key, p, q) {
  return bigInt(n).modPow(key, p*q).toJSNumber();
}

function easyRSA(n, key, p, q) {
  var msg = toggleEncrypt(n,key,p,q);
  return numToWord(msg%1000);
}