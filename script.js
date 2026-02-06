// === NAVIGATION LOGIC ===

function showSelectionScreen() {
    const landing = document.getElementById('landing-page');
    const selection = document.getElementById('section-selection');
    
    landing.style.opacity = '0';
    setTimeout(() => {
        landing.style.display = 'none';
        selection.classList.remove('hidden');
    }, 500);
}

function loadSection(type) {
    const selection = document.getElementById('section-selection');
    const app = document.getElementById('main-app');
    const title = document.getElementById('active-module-title');

    // Set Data based on selection
    if (type === 'math') {
        currentQuestions = [...mathData];
        title.innerHTML = "MATHEMATICS";
        title.className = "text-[#00f3ff]"; // Cyan for Math
    } else {
        currentQuestions = [...esasData];
        title.innerHTML = "ESAS";
        title.className = "text-[#ff00ff]"; // Pink for ESAS
    }

    // Reset states
    currentMode = 'review';
    resetExam(); 
    resetPractice();
    setMode('review'); // Default to study mode

    // Transition
    selection.classList.add('hidden');
    app.classList.remove('hidden');
    setTimeout(() => { app.style.opacity = '1'; }, 100);
}

function backToSelection() {
    const app = document.getElementById('main-app');
    const selection = document.getElementById('section-selection');
    
    app.style.opacity = '0';
    setTimeout(() => {
        app.classList.add('hidden');
        selection.classList.remove('hidden');
    }, 500);
}

// === DATABASE ===

const mathData = [
    { id: 1, key: 'c', topic: "Combinatorics", q: "In an examination, an examinee may select 7 problems from a set of 10 questions. In how many ways can he make his choice?", options: {a: "604,800 ways", b: "100 ways", c: "120 ways", d: "150 ways"}, ans: "120 ways", soln: "$$C(10,7) = 120$$", caltech: "<span class='key'>10</span> <span class='key action'>Shift</span> <span class='key'>÷</span> (nCr) <span class='key'>7</span>" },
    { id: 2, key: 'c', topic: "Quadratic Eq", q: "The quadratic equation whose roots are 2 and -3 is:", options: {a: "x² - x - 6 = 0", b: "x² - x + 6 = 0", c: "x² + x - 6 = 0", d: "x² + x + 6 = 0"}, ans: "x² + x - 6 = 0", soln: "Factors are (x-2) and (x+3). $$(x-2)(x+3) = x^2+x-6$$", caltech: "Mode 5 (EQN) → 3. Test coeff 1, 1, -6. Roots = 2, -3." },
    { id: 3, key: 'b', topic: "Binomial", q: "The fourth term in the binomial expansion of (3s+2t)⁵ is:", options: {a: "24st", b: "720s²t³", c: "648s⁴t", d: "24s⁴t"}, ans: "720s²t³", soln: "r=3. $$T_4 = \\binom{5}{3}(3s)^2(2t)^3 = 10(9s^2)(8t^3) = 720s^2t^3$$", caltech: "<span class='key'>5</span> <span class='key action'>Shift</span> <span class='key'>÷</span> <span class='key'>3</span> <span class='key'>×</span> <span class='key'>3</span> <span class='key'>^</span> <span class='key'>2</span> <span class='key'>×</span> <span class='key'>2</span> <span class='key'>^</span> <span class='key'>3</span>" },
    { id: 4, key: 'c', topic: "Work Problem", q: "Mario can finish a job two hours longer than Pepe. After working for 1 hour, Pepe joins him and they can complete the job in 3 more hours. How long would it take Mario to finish the job if he worked alone?", options: {a: "5 hr", b: "6 hr", c: "8 hr", d: "10 hr"}, ans: "8 hr", soln: "Let Pepe=x, Mario=x+2. Eq: 4/(x+2) + 3/x = 1. Solve x=6. Mario=8.", caltech: "Input: <span class='key'>4</span> <span class='key'>÷</span> <span class='key'>(</span> <span class='key action'>X</span> <span class='key'>+</span> <span class='key'>2</span> <span class='key'>)</span> <span class='key'>+</span> <span class='key'>3</span> <span class='key'>÷</span> <span class='key action'>X</span> <span class='key action'>ALPHA</span> <span class='key'>=</span> <span class='key'>1</span>. <span class='key action'>Shift</span> <span class='key func'>Solve</span>." },
    { id: 5, key: 'b', topic: "Circles", q: "Determine the area enclosed by the circle x² + y² - 10x + 4y = 196.", options: {a: "15π", b: "225π", c: "12π", d: "144π"}, ans: "225π", soln: "Complete squares: $$(x-5)^2 + (y+2)^2 = 225$$ $$r^2=225, Area=225\\pi$$", caltech: null },
    { id: 6, key: 'b', topic: "Rate Problem", q: "A river flows at 3 miles per hour. Find the speed of a motorboat which goes upstream 2 miles at the same time required to go 3 miles downstream.", options: {a: "10 mph", b: "15 mph", c: "20 mph", d: "25 mph"}, ans: "15 mph", soln: "$$2/(v-3) = 3/(v+3)$$ Solve v=15.", caltech: "Input: <span class='key'>2</span> <span class='key'>÷</span> <span class='key'>(</span> <span class='key action'>X</span> <span class='key'>-</span> <span class='key'>3</span> <span class='key'>)</span> <span class='key action'>ALPHA</span> <span class='key'>=</span> <span class='key'>3</span> <span class='key'>÷</span> <span class='key'>(</span> <span class='key action'>X</span> <span class='key'>+</span> <span class='key'>3</span> <span class='key'>)</span>. <span class='key action'>Shift</span> <span class='key func'>Solve</span>." },
    { id: 7, key: 'c', topic: "Solid Geom", q: "What is the volume of a right circular cylinder inscribed in a cube of edge 10 cm?", options: {a: "200π", b: "230π", c: "250π", d: "300π"}, ans: "250π", soln: "h=10, r=5. $$V = \\pi(25)(10) = 250\\pi$$", caltech: "<span class='key'>π</span> <span class='key'>×</span> <span class='key'>25</span> <span class='key'>×</span> <span class='key'>10</span>" },
    { id: 8, key: 'c', topic: "Permutations", q: "In how many ways can 5 people line up to pay their electric bills if two particular persons refuse to follow each other?", options: {a: "120", b: "90", c: "72", d: "140"}, ans: "72", soln: "Total (120) - Together (48) = 72.", caltech: "<span class='key'>5!</span> <span class='key'>-</span> <span class='key'>(</span> <span class='key'>2!</span> <span class='key'>×</span> <span class='key'>4!</span> <span class='key'>)</span>" },
    { id: 9, key: 'd', topic: "Parabola", q: "The length of the latus rectum of parabola with y² - 8x - 4y - 20 = 0 is:", options: {a: "2", b: "4", c: "6", d: "8"}, ans: "8", soln: "$$(y-2)^2 = 8(x+3)$$ LR = 4a = 8.", caltech: null },
    { id: 10, key: 'c', topic: "Trigonometry", q: "Given a triangle with angle C=28.7°, side a=132 units and side b=224 units. Solve for angle B.", options: {a: "130°", b: "110°", c: "120°", d: "90°"}, ans: "120°", soln: "Cosine Law for c, then Cosine Law for B.", caltech: "1. Calc c: <span class='key'>√</span>(132²+224²-2(132)(224)cos28.7). 2. Cosine Law for B." },
    { id: 11, key: 'a', topic: "Trig ID", q: "If tan 4A = cot 6A, then what is the value of angle A?", options: {a: "9°", b: "12°", c: "10°", d: "14°"}, ans: "9°", soln: "Cofunction: 4A + 6A = 90. 10A = 90. A = 9.", caltech: "Input: <span class='key'>tan</span>(4X) <span class='key action'>=</span> <span class='key'>1</span> <span class='key'>÷</span> <span class='key'>tan</span>(6X). <span class='key action'>Shift</span> <span class='key func'>Solve</span>." },
    { id: 12, key: 'a', topic: "Mensuration", q: "How many dozens of tiles measuring 5 cm by 5 cm are needed to cover a wall measuring 2 m by 1.5 m?", options: {a: "100", b: "120", c: "1,000", d: "1,200"}, ans: "100", soln: "Area 30000 / 25 = 1200 tiles = 100 doz.", caltech: "<span class='key'>200</span> <span class='key'>×</span> <span class='key'>150</span> <span class='key'>÷</span> <span class='key'>25</span> <span class='key'>÷</span> <span class='key'>12</span>" },
    { id: 13, key: 'b', topic: "Calculus", q: "Find the first derivative of ln(cos x).", options: {a: "csc x", b: "-tan x", c: "sec x", d: "cot x"}, ans: "-tan x", soln: "$$y' = (1/\\cos x)(-\\sin x) = -\\tan x$$", caltech: "Set Mode Rad. <span class='key'>d/dx</span> ( <span class='key'>ln</span> ( <span class='key'>cos</span> ( <span class='key'>X</span> ) ) ) | x=2. Compare with <span class='key'>-tan</span>(2)." },
    { id: 14, key: 'b', topic: "Rates", q: "A man 1.8 m tall is walking at the rate of 1.2 m/s away from a lamp post 6.7 m high. At what rate is the tip of his shadow receding from the lamp post?", options: {a: "2.16 m/s", b: "1.64 m/s", c: "1.83 m/s", d: "1.78 m/s"}, ans: "1.64 m/s", soln: "Similar triangles derivative.", caltech: null },
    { id: 15, key: 'b', topic: "Integrals", q: "Solve the double integral $$\\int_{0}^{\\pi/2}\\int_{2}^{4\\cos\\theta}\\rho^{3}d\\rho d\\theta$$", options: {a: "π/3", b: "10π", c: "π/2", d: "3π"}, ans: "10π", soln: "Convert and solve.", caltech: "Calc inner: <span class='key'>∫</span> (ρ³, 2, 4cos(A)). Then Outer integral." },
    { id: 16, key: 'b', topic: "Mechanics", q: "What theorem is used to solve for centroids?", options: {a: "Pappus'", b: "Varignon's", c: "Castigliano's", d: "Pascal's"}, ans: "Varignon's", soln: "Principle of Moments.", caltech: null },
    { id: 17, key: 'b', topic: "Optimization", q: "Find two numbers whose sum are 20 and whose product is maximum.", options: {a: "8 and 12", b: "10 and 10", c: "6 and 14", d: "9 and 11"}, ans: "10 and 10", soln: "Square maximizes product.", caltech: "Table Mode: f(x) = X(20-X). Find Max." },
    { id: 18, key: 'c', topic: "Rates", q: "A conical vessel 12 cm deep and with a radius of 6 cm at the top, is being filled with water. If the rate at which the water rises is 2 cm/s, how fast is the volume increasing when the water is 4 cm deep?", options: {a: "3π", b: "4π", c: "8π", d: "16π"}, ans: "8π", soln: "dV/dt formula for cone.", caltech: null },
    { id: 19, key: 'c', topic: "Complex", q: "i¹⁰⁰ is equal to:", options: {a: "i", b: "-i", c: "1", d: "-1"}, ans: "1", soln: "100 is multiple of 4.", caltech: "Mode 2 (CMPLX). <span class='key'>i</span> <span class='key'>^</span> <span class='key'>100</span> (Use <span class='key'>i</span> <span class='key'>^</span> <span class='key'>4</span> logic if error)." },
    { id: 20, key: 'c', topic: "Laplace", q: "The inverse Laplace transform of 6/(2s+10) is:", options: {a: "3e⁻¹⁰ᵗ", b: "6e⁻⁵ᵗ", c: "3e⁻⁵ᵗ", d: "0.6e⁻²ᵗ"}, ans: "3e⁻⁵ᵗ", soln: "Simplify to 3/(s+5).", caltech: null },
    { id: 21, key: 'c', topic: "Complex", q: "Subtract (5-2i) from (3-5i).", options: {a: "2+3i", b: "2-7i", c: "-2-3i", d: "13-16i"}, ans: "-2-3i", soln: "(3-5) + i(-5+2).", caltech: "Mode 2. <span class='key'>(</span> <span class='key'>3</span> <span class='key'>-</span> <span class='key'>5i</span> <span class='key'>)</span> <span class='key'>-</span> <span class='key'>(</span> <span class='key'>5</span> <span class='key'>-</span> <span class='key'>2i</span> <span class='key'>)</span>" },
    { id: 22, key: 'c', topic: "Matrix", q: "Evaluate determinant of complex matrix |3+4i  -2i; -2i  3-4i|.", options: {a: "21", b: "5-16i", c: "29", d: "4-2i"}, ans: "29", soln: "(3+4i)(3-4i) - (-2i)(-2i).", caltech: "Mode 2. <span class='key'>(</span> <span class='key'>3+4i</span> <span class='key'>)</span> <span class='key'>(</span> <span class='key'>3-4i</span> <span class='key'>)</span> <span class='key'>-</span> <span class='key'>(</span> <span class='key'>-2i</span> <span class='key'>)</span>²" },
    { id: 23, key: 'c', topic: "Geometry", q: "An equilateral triangle has an altitude of 5√3 cm long. Find its area.", options: {a: "5√3/4", b: "100√3", c: "25√3", d: "50√3"}, ans: "25√3", soln: "s=10. Area formula.", caltech: null },
    { id: 24, key: 'd', topic: "Series", q: "Find the total distance, in inches, which the tip of a pendulum will travel if the first swing is 10 inches, and each succeeding swing is 9/10 of the previous one.", options: {a: "110", b: "99", c: "90", d: "100"}, ans: "100", soln: "S = 10/(1-0.9).", caltech: "<span class='key'>10</span> <span class='key'>÷</span> <span class='key'>(</span> <span class='key'>1</span> <span class='key'>-</span> <span class='key'>0.9</span> <span class='key'>)</span>" },
    { id: 25, key: 'b', topic: "Vectors", q: "The operator j when multiplied to a given vector will cause that vector to rotate counter-clockwise through an angle of:", options: {a: "180°", b: "90°", c: "60°", d: "270°"}, ans: "90°", soln: "Imaginary axis is 90 deg.", caltech: null },
    { id: 26, key: 'a', topic: "Laplace", q: "The Laplace transform of te²ᵗ is:", options: {a: "1/(s-2)²", b: "e²/s²", c: "1/(s²(s-2))", d: "e²/(s-2)"}, ans: "1/(s-2)²", soln: "Frequency shift.", caltech: null },
    { id: 27, key: 'd', topic: "Diff Eq", q: "Solve the equation: ydy - 4xdx = 0", options: {a: "y²+x²=c", b: "4x²-y²=c", c: "y²+4x²=c", d: "y²=4x²+c"}, ans: "y²=4x²+c", soln: "Integrate y and x.", caltech: null },
    { id: 28, key: 'd', topic: "Trig", q: "If the ratio of sec A to csc A is 1:4, find the ratio of tan A to cot A.", options: {a: "4:1", b: "1:8", c: "8:1", d: "1:16"}, ans: "1:16", soln: "tan=1/4. ratio is tan².", caltech: "<span class='key'>(</span> <span class='key'>1/4</span> <span class='key'>)</span> <span class='key'>÷</span> <span class='key'>(</span> <span class='key'>4</span> <span class='key'>)</span>" },
    { id: 29, key: 'c', topic: "Decay", q: "If the half-life of a radioactive substance is 1500 years, determine the percentage that remains after 250 years.", options: {a: "80%", b: "75%", c: "89%", d: "98%"}, ans: "89%", soln: "0.5^(250/1500).", caltech: "<span class='key'>0.5</span> <span class='key'>^</span> <span class='key'>(</span> <span class='key'>250</span> <span class='key'>÷</span> <span class='key'>1500</span> <span class='key'>)</span>" },
    { id: 30, key: 'c', topic: "Logs", q: "Find the value of a in the equation logₐ 2187 = 7/2.", options: {a: "3", b: "6", c: "9", d: "12"}, ans: "9", soln: "a = 2187^(2/7).", caltech: "<span class='key'>2187</span> <span class='key'>^</span> <span class='key'>(</span> <span class='key'>2</span> <span class='key'>÷</span> <span class='key'>7</span> <span class='key'>)</span>" },
    { id: 31, key: 'a', topic: "Diff Eq", q: "Which of the following differential equations is a variable separable?", options: {a: "2ydx=(x²+1)dy", b: "(x+y)dx-2ydy=0", c: "(x+x²y)dy...", d: "y²dx+..."}, ans: "2ydx=(x²+1)dy", soln: "Separable.", caltech: null },
    { id: 32, key: 'c', topic: "Growth", q: "The rate of population growth... is 40 million now and 50 million in ten years, what will be its population (in million) 20 years from now?", options: {a: "56.19", b: "71.29", c: "62.18", d: "59.24"}, ans: "62.18", soln: "40 * (1.25)².", caltech: "<span class='key'>40</span> <span class='key'>×</span> <span class='key'>1.25</span> <span class='key'>^</span> <span class='key'>2</span>" },
    { id: 33, key: 'c', topic: "Prob", q: "A bag contains 3 white and 5 black balls. If two balls are drawn in succession without replacement, what is the probability that both balls are black?", options: {a: "5/16", b: "5/28", c: "5/14", d: "5/32"}, ans: "5/14", soln: "(5/8)*(4/7).", caltech: "<span class='key'>5</span> <span class='key'>÷</span> <span class='key'>8</span> <span class='key'>×</span> <span class='key'>4</span> <span class='key'>÷</span> <span class='key'>7</span> <span class='key action'>=</span> (5/14)" },
    { id: 34, key: 'b', topic: "Inv Trig", q: "Solve for x in the equation: Arctan(x+1) + Arctan(x-1) = Arctan 12", options: {a: "1.5", b: "1.33", c: "1.20", d: "1.25"}, ans: "1.33", soln: "Tan sum formula.", caltech: "Input eq: <span class='key'>tan⁻¹</span>(X+1) + <span class='key'>tan⁻¹</span>(X-1) <span class='key action'>=</span> <span class='key'>tan⁻¹</span>(12). <span class='key action'>Shift</span> <span class='key func'>Solve</span>." },
    { id: 35, key: 'd', topic: "Surveying", q: "A line from point A to B has a bearing of N 55° W and a length of 50m. Another line from A to C has a bearing of N 50° E and a length of 100 m. Find the length of the line BC.", options: {a: "111.94 m", b: "133.74 m", c: "147.65 m", d: "122.83 m"}, ans: "122.83 m", soln: "Cosine Law (105 deg).", caltech: "<span class='key'>√</span>(50² + 100² - 2(50)(100)cos(105))" },
    { id: 36, key: 'a', topic: "Mensuration", q: "How many dozens of tiles measuring 5 cm by 5 cm are needed to cover a wall measuring 2 m by 1.5 m? (Duplicate of Q12)", options: {a: "100", b: "120", c: "1,000", d: "1,200"}, ans: "100", soln: "Same as Q12.", caltech: "See Q12" },
    { id: 37, key: 'c', topic: "Integral", q: "Find the area bounded by the parabola y²=4x and the line y=2x-4.", options: {a: "7", b: "8", c: "9", d: "10"}, ans: "9", soln: "Definite Integral.", caltech: "<span class='key'>∫</span> ( ((X+4)/2 - X²/4), -2, 4 )" },
    { id: 38, key: 'c', topic: "AP", q: "Find x so that 5x-3, x+2 and 3x-11 will form an arithmetic progression.", options: {a: "1", b: "2", c: "3", d: "4"}, ans: "3", soln: "2(x+2) = sum of others.", caltech: "Input: 2(X+2) <span class='key action'>=</span> (5X-3)+(3X-11). <span class='key action'>Shift</span> <span class='key func'>Solve</span>." },
    { id: 39, key: 'b', topic: "Vectors", q: "The vectors A=-4i+2k and B=2i-k are:", options: {a: "orthogonal", b: "parallel", c: "neither", d: "none"}, ans: "parallel", soln: "Scalar multiple.", caltech: "Vector Mode. Dot Product = |A||B|? Or Cross Product = 0?" },
    { id: 40, key: 'd', topic: "Permutation", q: "Five different mathematics books, four different physics books and 2 different books in electric circuits are to be placed on a shelf with the books of the same subject together. Find the number of ways in which the books can be placed.", options: {a: "292", b: "5760", c: "12870", d: "34,560"}, ans: "34,560", soln: "3! * 5! * 4! * 2!", caltech: "<span class='key'>3!</span> <span class='key'>×</span> <span class='key'>5!</span> <span class='key'>×</span> <span class='key'>4!</span> <span class='key'>×</span> <span class='key'>2!</span>" },
    { id: 41, key: 'a', topic: "Opt", q: "A closed cylindrical tank has a capacity of 576.56 m³. Find the minimum surface area of the tank.", options: {a: "383.40", b: "412.6", c: "516.32", d: "218.60"}, ans: "383.40", soln: "h=D for min area.", caltech: "r = <span class='key'>∛</span>(576.56/2π). Area = 6πr²." },
    { id: 42, key: 'a', topic: "Geom", q: "A conical vessel has a height of 24 cm and base diameter of 12 cm. It holds water to a depth of 18 cm. Find the volume of its content.", options: {a: "381.70", b: "298.40", c: "412.60", d: "188.40"}, ans: "381.70", soln: "Similar triangles.", caltech: null },
    { id: 43, key: 'c', topic: "Trig", q: "Express 2sin²θ as a function of cos 2θ.", options: {a: "cos 2θ - 1", b: "cos 2θ + 1", c: "1 - cos 2θ", d: "1 + cos 2θ"}, ans: "1 - cos 2θ", soln: "Identity.", caltech: "Graph Mode? Or test θ=30. 2sin²(30)=0.5. Check options." },
    { id: 44, key: 'd', topic: "Permutation", q: "Duplicate of Q40 (Books arrangement).", options: {a: "292", b: "5760", c: "12870", d: "34,560"}, ans: "34,560", soln: "Same as Q40.", caltech: "See Q40" },
    { id: 45, key: 'a', topic: "Diff Eq", q: "The equation y = 3x² + ce⁻²ˣ is the general solution of:", options: {a: "y'+2y=6x²+6x", b: "y''+2y=...", c: "y'-2y=...", d: "y''+2y=..."}, ans: "y'+2y=6x²+6x", soln: "Eliminate c.", caltech: null },
    { id: 46, key: 'd', topic: "Functions", q: "If the domain of f(x) = (4x+3)/(x-1) is R-{1}, what is the range of f?", options: {a: "R - {1}", b: "R - {2}", c: "R - {3}", d: "R - {4}"}, ans: "R - {4}", soln: "Horizontal Asymptote.", caltech: "Calc Limit x→∞. 4/1 = 4." },
    { id: 47, key: 'd', topic: "Ineq", q: "Which of the following inequalities have a solution set (-2, 3)?", options: {a: "x²-8x-25≥0", b: "x²-4x-21≥0", c: "x²-4x-21<0", d: "x²-x-6<0"}, ans: "x²-x-6 < 0", soln: "Between roots is < 0.", caltech: "Inequality Mode (Mode A)." },
    { id: 48, key: 'b', topic: "Variation", q: "What is z when x = 4 and y = 2 if z varies directly as x and inversely as y, and if z=5 when x=2 and y=3?", options: {a: "7.5", b: "15", c: "30", d: "10"}, ans: "15", soln: "k=7.5.", caltech: "Proportion" },
    { id: 49, key: 'b', topic: "Binomial", q: "Find the 5th term of (3x-y)⁸.", options: {a: "-5670x⁴y⁴", b: "5670x⁴y⁴", c: "13608x³y⁵", d: "-13608x³y⁵"}, ans: "5670x⁴y⁴", soln: "Even power of y is positive.", caltech: "<span class='key'>8</span> <span class='key func'>nCr</span> <span class='key'>4</span> <span class='key'>×</span> <span class='key'>3</span> <span class='key'>^</span> <span class='key'>4</span>" },
    { id: 50, key: 'd', topic: "Sequence", q: "Find the value of x if the following forms a harmonic sequence; -1/2, 1, 1/x, 1/16.", options: {a: "7", b: "8", c: "9", d: "10"}, ans: "10", soln: "AP reciprocals: -2, 4, 10, 16.", caltech: null }
];

const esasData = [
    { 
        id: 51, 
        key: 'b', 
        topic: "Engineering Economy", 
        q: "A man borrowed P20,000 from a local commercial bank which has a simple interest of 16%, but the interest is to be deducted from the loan at the time that the money was borrowed and the loan is payable at the end of the year. How much is the actual rate of interest?", 
        options: {a: "19.5%", b: "19.05%", c: "19.32%", d: "19.75%"}, 
        ans: "19.05%", 
        soln: "This is a bank discount problem. Interest (I) = 20,000 × 0.16 = 3,200. The amount actually received (Proceeds) = 20,000 - 3,200 = 16,800. Actual Rate = I / Proceeds = 3,200 / 16,800 = 19.05%.", 
        caltech: "<span class='key'>3200</span> <span class='key'>÷</span> <span class='key'>16800</span>" 
    },
    { 
        id: 52, 
        key: 'b', 
        topic: "Annuity", 
        q: "Mr. Cruz plans to deposit for the education of his 5-year old son. P500 at the end of each month for 10 years at 12% annual interest compounded monthly. The amount that will be available in two years is:", 
        options: {a: "P13,864.70", b: "P13,486.70", c: "P13,468.70", d: "P13,470.86"}, 
        ans: "P13,486.70", 
        soln: "Future Value of an Ordinary Annuity: F = A[((1+i)^n - 1)/i]. Where A = 500, i = 0.12/12 = 0.01, and n = 2 years × 12 months = 24. F = 500[((1.01)^24 - 1)/0.01] = 13,486.70.", 
        caltech: "<span class='key'>500</span> <span class='key'>[</span> <span class='key'>(</span> <span class='key'>1.01</span> <span class='key'>^</span> <span class='key'>24</span> <span class='key'>-</span> <span class='key'>1</span> <span class='key'>)</span> <span class='key'>÷</span> <span class='key'>0.01</span> <span class='key'>]</span>" 
    },
    { 
        id: 53, 
        key: 'b', 
        topic: "Effective Rate", 
        q: "Compute the equivalent rate of 6% compounded semi-annually to a rate compounded quarterly.", 
        options: {a: "4.96%", b: "5.96%", c: "5.06%", d: "5.09%"}, 
        ans: "5.96%", 
        soln: "Set the effective rates equal: (1 + i_nominal/m)^m. Thus, (1 + 0.06/2)^2 = (1 + r/4)^4. Solving for r: r = 4 * [(1.03)^(2/4) - 1] = 0.05955 or 5.96%.", 
        caltech: "<span class='key'>(</span> <span class='key'>1</span> <span class='key'>+</span> <span class='key'>.06</span> <span class='key'>÷</span> <span class='key'>2</span> <span class='key'>)</span> <span class='key'>^</span> <span class='key'>2</span> <span class='key action'>ALPHA</span> <span class='key action'>CALC</span> <span class='key'>(</span> <span class='key'>1</span> <span class='key'>+</span> <span class='key action'>X</span> <span class='key'>÷</span> <span class='key'>4</span> <span class='key'>)</span> <span class='key'>^</span> <span class='key'>4</span> <span class='key action'>SHIFT</span> <span class='key func'>SOLVE</span>" 
    },
    { 
        id: 54, 
        key: 'd', 
        topic: "Time Value", 
        q: "How long (years) will it take money to quadruple if it earns 7% compounded semi-annually?", 
        options: {a: "22.15", b: "25.15", c: "21.15", d: "20.15"}, 
        ans: "20.15", 
        soln: "Formula: F = P(1 + i)^n. Since money quadruples, F = 4P. 4 = (1 + 0.07/2)^(2t). Taking the natural log of both sides: ln(4) = 2t * ln(1.035). t = ln(4) / [2 * ln(1.035)] = 20.15 years.", 
        caltech: "<span class='key'>ln</span> <span class='key'>4</span> <span class='key'>÷</span> <span class='key'>(</span> <span class='key'>2</span> <span class='key'>ln</span> <span class='key'>1.035</span> <span class='key'>)</span>" 
    },
    { 
        id: 55, 
        key: 'a', 
        topic: "Compound Interest", 
        q: "For a loan acquired six years ago, a man paid out the amount of P75,000. The interest was compounded at 18% compounded annually. How much was the borrowed amount?", 
        options: {a: "P27,782.36", b: "P27,872.36", c: "P28,772.36", d: "P27,728.36"}, 
        ans: "P27,782.36", 
        soln: "Present Value Formula: P = F(1 + i)^-n. Given F = 75,000, i = 0.18, and n = 6. P = 75,000(1.18)^-6 = 27,782.36.", 
        caltech: "<span class='key'>75000</span> <span class='key'>(</span> <span class='key'>1.18</span> <span class='key'>)</span> <span class='key'>^</span> <span class='key'>-</span> <span class='key'>6</span>" 
    },
    { 
        id: 56, 
        key: 'b', 
        topic: "Amortization", 
        q: "A debt of P10,000 with 10% interest compounded semi-annually is to be amortized by semi-annual payments over the next 5 years. The first due is 6 months. Determine the semi-annual payments.", 
        options: {a: "P1,925.05", b: "P1,295.05", c: "P1,529.05", d: "P1,259.05"}, 
        ans: "P1,295.05", 
        soln: "Find periodic payment A: A = P * [ i / (1 - (1+i)^-n) ]. P = 10,000, i = 0.10/2 = 0.05, n = 5 years * 2 = 10 periods. A = 10,000 * [ 0.05 / (1 - 1.05^-10) ] = 1,295.05.", 
        caltech: "<span class='key'>10000</span> <span class='key'>÷</span> <span class='key'>[</span> <span class='key'>(</span> <span class='key'>1</span> <span class='key'>-</span> <span class='key'>1.05</span> <span class='key'>^</span> <span class='key'>-</span> <span class='key'>10</span> <span class='key'>)</span> <span class='key'>÷</span> <span class='key'>0.05</span> <span class='key'>]</span>" 
    },
    { 
        id: 57, 
        key: 'd', 
        topic: "Continuous Comp", 
        q: "Six hundred pesos is deposited each year into a savings bank account that pays 6% nominal interest, compounded continuously. How much will be in the account at the end of 8 years?", 
        options: {a: "P5,797.77", b: "P7,597.77", c: "P5,779.77", d: "P5,977.77"}, 
        ans: "P5,977.77", 
        soln: "For continuous compounding with annual deposits: F = A[(e^(rn) - 1) / (e^r - 1)]. A = 600, r = 0.06, n = 8. F = 600[(e^0.48 - 1) / (e^0.06 - 1)] = 5,977.77.", 
        caltech: "<span class='key'>600</span> <span class='key'>(</span> <span class='key func'>e</span> <span class='key'>^</span> <span class='key'>0.48</span> <span class='key'>-</span> <span class='key'>1</span> <span class='key'>)</span> <span class='key'>÷</span> <span class='key'>(</span> <span class='key func'>e</span> <span class='key'>^</span> <span class='key'>0.06</span> <span class='key'>-</span> <span class='key'>1</span> <span class='key'>)</span>" 
    },
    { 
        id: 58, 
        key: 'a', 
        topic: "Depreciation", 
        q: "The cost of equipment is P500,000 and the cost of installation is P30,000. If the salvage value is 10% of the cost of equipment at the end of 5 years, determine the book value at the end of the fourth year. Use straight line method.", 
        options: {a: "P146,000", b: "P164,000", c: "P140,600", d: "P160,400"}, 
        ans: "P146,000", 
        soln: "First Cost (Co) = 500,000 + 30,000 = 530,000. Salvage Value (Cl) = 0.10 * 500,000 = 50,000. Annual Depreciation (d) = (Co - Cl) / n = (530,000 - 50,000) / 5 = 96,000. Book Value (BV4) = Co - 4(d) = 530,000 - 4(96,000) = 146,000.", 
        caltech: "<span class='key'>530000</span> <span class='key'>-</span> <span class='key'>4</span> <span class='key'>(</span> <span class='key'>96000</span> <span class='key'>)</span>" 
    },
    { 
        id: 59, 
        key: 'a', 
        topic: "Econ Terms", 
        q: "It is the element of value which a business has earned through the favorable consideration and patronage of its customers.", 
        options: {a: "goodwill value", b: "utility value", c: "franchise value", d: "fair value"}, 
        ans: "goodwill value", 
        soln: "Goodwill represents the intangible value of a company's reputation, customer base, and brand recognition.", 
        caltech: null 
    },
    { 
        id: 60, 
        key: 'd', 
        topic: "Econ Terms", 
        q: "It is defined to be the capacity of a commodity to satisfy human want.", 
        options: {a: "demand", b: "benefit", c: "value", d: "utility"}, 
        ans: "utility", 
        soln: "Utility is the economic term for the satisfaction or 'value' a consumer receives from consuming a good or service.", 
        caltech: null 
    },
    { 
        id: 61, 
        key: 'c', 
        topic: "Depreciation", 
        q: "It is a method of depreciation where a property can never depreciate to zero value.", 
        options: {a: "straight line", b: "sinking fund", c: "Matheson", d: "SYD"}, 
        ans: "Matheson", 
        soln: "The Matheson Method (Declining Balance) applies a fixed percentage to the remaining book value; since it's a percentage of a non-zero number, it theoretically never hits absolute zero.", 
        caltech: null 
    },
    { 
        id: 62, 
        key: 'c', 
        topic: "Econ Terms", 
        q: "It is anything of value that is owned by a person or an enterprise.", 
        options: {a: "liabilities", b: "capital", c: "asset", d: "consumer goods"}, 
        ans: "asset", 
        soln: "An asset is a resource with economic value that an individual, corporation, or country owns or controls with the expectation that it will provide a future benefit.", 
        caltech: null 
    },
    { 
        id: 63, 
        key: 'a', 
        topic: "Compound Factor", 
        q: "If a sum of money tripled after 3 years, what is the 'single payment compound factor'?", 
        options: {a: "3", b: "9", c: "1/3", d: "1/9"}, 
        ans: "3", 
        soln: "The Single Payment Compound Amount Factor is defined as (F/P). If the money triples, F = 3P, so F/P = 3.", 
        caltech: null 
    },
    { 
        id: 64, 
        key: 'b', 
        topic: "Profit", 
        q: "A bought a device then sold it to B for a profit of 40%. B sold the device to C for a profit of 20%. If C paid P2,856 more it cost A. How much did A bought the device?", 
        options: {a: "P2,040", b: "P4,200", c: "P2,400", d: "P4,020"}, 
        ans: "P4,200", 
        soln: "Let x = cost to A. B buys for 1.4x. C buys for 1.4x * 1.2 = 1.68x. The difference is 1.68x - x = 2,856. 0.68x = 2,856. x = 2,856 / 0.68 = 4,200.", 
        caltech: "<span class='key'>2856</span> <span class='key'>÷</span> <span class='key'>0.68</span>" 
    },
    { 
        id: 65, 
        key: 'b', 
        topic: "Sinking Fund", 
        q: "Find the annual payment to extinguish a debt of P10,000 if it is payable in 5 years at 12%.", 
        options: {a: "P2,870.10", b: "P2,774.10", c: "P3,810.32", d: "P4,213.42"}, 
        ans: "P2,774.10", 
        soln: "Extinguishing a debt usually implies amortization (Ordinary Annuity). A = P * [ i / (1 - (1+i)^-n) ]. A = 10,000 * [ 0.12 / (1 - 1.12^-5) ] = 2,774.10.", 
        caltech: "<span class='key'>10000</span> <span class='key'>÷</span> <span class='key'>[</span> <span class='key'>(</span> <span class='key'>1</span> <span class='key'>-</span> <span class='key'>1.12</span> <span class='key'>^</span> <span class='key'>-</span> <span class='key'>5</span> <span class='key'>)</span> <span class='key'>÷</span> <span class='key'>0.12</span> <span class='key'>]</span>" 
    },
    { 
        id: 66, 
        key: 'a', 
        topic: "Thermodynamics", 
        q: "The volume of a gas under standard atmospheric pressure, 76 cm Hg, is 200 in³. What is the volume when pressure is 80 cm Hg, if the temperature is unchanged, in³?", 
        options: {a: "190", b: "110", c: "90", d: "30.4"}, 
        ans: "190", 
        soln: "Use Boyle's Law (P1V1 = P2V2) since temperature is constant. (76)(200) = (80)(V2). V2 = 15,200 / 80 = 190 in³.", 
        caltech: "<span class='key'>76</span> <span class='key'>×</span> <span class='key'>200</span> <span class='key'>÷</span> <span class='key'>80</span>" 
    },
    { 
        id: 67, 
        key: 'c', 
        topic: "Temperature", 
        q: "Two thermometers, one calibrated in Celsius and the other in Fahrenheit, are used to measure the same temperature. The numerical reading obtained on the Fahrenheit thermometer is-", 
        options: {a: "greater than that obtained on the Celsius thermometer", b: "less than that obtained on the Celsius thermometer", c: "may be greater or less than that obtained on the Celsius thermometer", d: "all of the above"}, 
        ans: "may be greater or less than that obtained on the Celsius thermometer", 
        soln: "F = 1.8C + 32. At -40, F = C. Above -40, F > C. Below -40, F < C. Therefore, it can be greater or less depending on the range.", 
        caltech: null 
    },
    { 
        id: 68, 
        key: 'd', 
        topic: "Missing Q", 
        q: "[QUESTION MISSING FROM SOURCE FILE]", 
        options: {a: "N/A", b: "N/A", c: "N/A", d: "N/A"}, 
        ans: "N/A", 
        soln: "This question (Q18) is missing from the provided source text (the text jumps from Q17 to Q19).", 
        caltech: null 
    },
    { 
        id: 69, 
        key: 'b', 
        topic: "Thermodynamics", 
        q: "An air has an initial pressure of 100 kPa absolute and volume of 1 m³. If the pressure will be increased to 120 kPa, find the new volume, in m³.", 
        options: {a: "1.2", b: "0.83", c: "0.63", d: "1.5"}, 
        ans: "0.83", 
        soln: "Assuming an isothermal process (Boyle's Law): P1V1 = P2V2. (100)(1) = (120)(V2). V2 = 100 / 120 = 0.833 m³.", 
        caltech: "<span class='key'>100</span> <span class='key'>÷</span> <span class='key'>120</span>" 
    },
    { 
        id: 70, 
        key: 'a', 
        topic: "Thermodynamics", 
        q: "In the study of thermodynamics, a working substance is a substance where energy can be added or extracted. Dry air which is composed of oxygen and nitrogen is considered as,", 
        options: {a: "ideal gas", b: "pure substance", c: "gas-vapor mixture", d: "all of the above"}, 
        ans: "ideal gas", 
        soln: "In most engineering applications, dry air is treated as an ideal gas because its molecules are far apart and have negligible interaction at standard conditions.", 
        caltech: null 
    },
    { 
        id: 71, 
        key: 'b', 
        topic: "Thermodynamics", 
        q: "Adiabatic means", 
        options: {a: "no work", b: "no heat", c: "constant temperature", d: "constant pressure"}, 
        ans: "no heat", 
        soln: "An adiabatic process is one in which there is no heat transfer (Q = 0) between the system and its surroundings.", 
        caltech: null 
    },
    { 
        id: 72, 
        key: 'd', 
        topic: "Thermodynamics", 
        q: "A reversible adiabatic process is", 
        options: {a: "isobaric", b: "isothermal", c: "isometric", d: "isentropic"}, 
        ans: "isentropic", 
        soln: "By definition, a reversible adiabatic process involves no change in entropy, making it an isentropic process.", 
        caltech: null 
    },
    { 
        id: 73, 
        key: 'b', 
        topic: "Thermodynamics", 
        q: "In the study of thermodynamics, a piston-cylinder assembly is considered what type of thermodynamic system", 
        options: {a: "open system", b: "closed system", c: "isolated system", d: "all of the above"}, 
        ans: "closed system", 
        soln: "In a piston-cylinder assembly, the amount of mass is fixed (unless there are valves), while energy (heat/work) can cross the boundary, defining it as a closed system.", 
        caltech: null 
    },
    { 
        id: 74, 
        key: 'c', 
        topic: "Thermodynamics", 
        q: "The process work in a steady flow process can be computed by", 
        options: {
            a: "-∫pdv", 
            b: "∫pdv", 
            c: "-∫vdp", 
            d: "∫vdp"
        }, 
        ans: "-∫vdp", 
        soln: "Steady flow work (Open System, e.g., Turbines) is given by W = -∫vdp, which corresponds to the area projected onto the vertical Pressure axis. In contrast, Non-flow work (Closed System, e.g., Piston) is W = ∫pdv, the area projected onto the horizontal Volume axis.", 
        caltech: "<span class='key'>-</span> <span class='key'>∫</span> <span class='key func'>V(x)</span>" 
    },
    { 
        id: 75, 
        key: 'a', 
        topic: "Thermodynamics", 
        q: "For an isentropic process, the relationship between initial (1) volume and temperature to the final (2) volume and temperature, and k as specific heat ratio is", 
        options: {a: "T1/T2=(V2/V1)^(k-1)", b: "T1/T2=(V2/V1)^(1-k)", c: "T1/T2=(V1/V2)^(k-1)", d: "T2/T1=(V2/V1)^(k-1)"}, 
        ans: "T1/T2=(V2/V1)^(k-1)", 
        soln: "From the adiabatic relation TV^(k-1) = constant, we get T1V1^(k-1) = T2V2^(k-1), which rearranges to T1/T2 = (V2/V1)^(k-1).", 
        caltech: null 
    },
    { 
        id: 76, 
        key: 'b', 
        topic: "Thermodynamics", 
        q: "A gas has an initial pressure of 101 kPa and temperature of 327K. It undergoes a constant volume process until its final temperature is 300 K. What is the final pressure in kPa?", 
        options: {a: "69.92", b: "92.66", c: "96.62", d: "66.92"}, 
        ans: "92.66", 
        soln: "Gay-Lussac's Law for constant volume: P1/T1 = P2/T2. (101 / 327) = (P2 / 300). P2 = (101 * 300) / 327 = 92.66 kPa.", 
        caltech: "<span class='key'>101</span> <span class='key'>×</span> <span class='key'>300</span> <span class='key'>÷</span> <span class='key'>327</span>" 
    },
    { 
        id: 77, 
        key: 'd', 
        topic: "Physics", 
        q: "An object weighing 5 N falls from rest at a height of 100 m. What is its kinetic energy at a height of 30 m, in N-m?", 
        options: {a: "300", b: "500", c: "150", d: "350"}, 
        ans: "350", 
        soln: "Using conservation of energy: Potential Energy lost = Kinetic Energy gained. The object fell 100m - 30m = 70m. ΔPE = Weight * Δh = 5N * 70m = 350 N-m. Therefore, KE = 350 N-m.", 
        caltech: "<span class='key'>5</span> <span class='key'>×</span> <span class='key'>(</span> <span class='key'>100</span> <span class='key'>-</span> <span class='key'>30</span> <span class='key'>)</span>" 
    },
    { 
        id: 78, 
        key: 'c', 
        topic: "Thermodynamics", 
        q: "Five kg of a gas initially at a temperature of 23K is heated until its temperature is 70 K. What is the work in kJ?", 
        options: {a: "235", b: "352", c: "0", d: "47"}, 
        ans: "0", 
        soln: "The problem implies heating in a closed, rigid system where volume is constant. Since Work = ∫P dv and dv = 0, the work done is 0.", 
        caltech: null 
    },
    { 
        id: 79, 
        key: 'b', 
        topic: "Thermodynamics", 
        q: "Twenty grams of oxygen gas (O2) are compressed at constant temperature of 30°C to 5% of its original volume. Find the work done on the system.", 
        options: {a: "944 cal", b: "1124 cal", c: "924 cal", d: "1144 cal"}, 
        ans: "1124 cal", 
        soln: "Work = nRT ln(V2/V1). Moles (n) = 20g / 32g/mol = 0.625. R = 1.987 cal/mol-K. T = 30 + 273 = 303 K. W = (0.625)(1.987)(303)ln(0.05) = -1124 cal. The work done 'on' the system is positive 1124 cal.", 
        caltech: "<span class='key'>0.625</span> <span class='key'>×</span> <span class='key'>1.987</span> <span class='key'>×</span> <span class='key'>303</span> <span class='key'>×</span> <span class='key'>ln</span> <span class='key'>0.05</span>" 
    },
    { 
        id: 80, 
        key: 'd', 
        topic: "Power", 
        q: "A device produces 37.5 joules per cycle. There is one power stroke per cycle. Calculate the power output if the device is run at 45 rpm.", 
        options: {a: "4.69 W", b: "26.125 W", c: "27.56 W", d: "14.063 W"}, 
        ans: "14.063 W", 
        soln: "Assuming a 4-stroke engine (standard context), there is 1 power stroke for every 2 revolutions. Power = (Work/cycle) * (n / 2). Power = 37.5 * (45/60) / 2 = 14.0625 W.", 
        caltech: "<span class='key'>37.5</span> <span class='key'>×</span> <span class='key'>(</span> <span class='key'>45</span> <span class='key'>÷</span> <span class='key'>120</span> <span class='key'>)</span>" 
    },
    { 
        id: 81, 
        key: 'd', 
        topic: "Thermodynamics", 
        q: "A gas is enclosed in a cylinder with a weighted piston as the top boundary. The gas is heated and expands from a volume of 0.04 m³ at a constant pressure of 200 kPa. Find the work done on the system if it reaches 0.10 m³.", 
        options: {a: "6 kJ", b: "10 kJ", c: "14 kJ", d: "12 kJ"}, 
        ans: "12 kJ", 
        soln: "Isobaric Work = P(V2 - V1). Assuming V2 = 0.10 based on common problem sets: W = 200,000 * (0.10 - 0.04) = 12,000 J or 12 kJ.", 
        caltech: "<span class='key'>200</span> <span class='key'>(</span> <span class='key'>0.10</span> <span class='key'>-</span> <span class='key'>0.04</span> <span class='key'>)</span>" 
    },
    { 
        id: 82, 
        key: 'b', 
        topic: "Chemistry", 
        q: "Two-third of the atom in a molecule of water is hydrogen. What percentage weight of a water molecule is the weight of two hydrogen atoms? The atomic weight of hydrogen is 1.008 g/mole and oxygen is 16.00 g/mole?", 
        options: {a: "19.2", b: "11.19", c: "19.11", d: "12.19"}, 
        ans: "11.19", 
        soln: "Water is H2O. Total Weight = 2(1.008) + 16.00 = 18.016. Weight % of H = [2(1.008) / 18.016] * 100 = 11.19%. (Note: Source text has a typo '.00 g/mole' for oxygen; corrected to '16.00 g/mole').", 
        caltech: "<span class='key'>2.016</span> <span class='key'>÷</span> <span class='key'>18.016</span>" 
    },
    { 
        id: 83, 
        key: 'b', 
        topic: "Thermodynamics", 
        q: "A cylinder contains oxygen at a pressure of 10 atm and a temperature of 300 K. The volume of the cylinder is 10 L. What is the mass of oxygen in grams? MW of oxygen is 32 g/mole.", 
        options: {a: "125.02", b: "130.08", c: "135.05", d: "120.04"}, 
        ans: "130.08", 
        soln: "Use PV = nRT. Moles (n) = PV/RT = (10 * 10) / (0.0821 * 300) = 4.06 mol. Mass = n * MW = 4.06 * 32 = 130.08 grams.", 
        caltech: "<span class='key'>(</span> <span class='key'>10</span> <span class='key'>×</span> <span class='key'>10</span> <span class='key'>×</span> <span class='key'>32</span> <span class='key'>)</span> <span class='key'>÷</span> <span class='key'>(</span> <span class='key'>0.0821</span> <span class='key'>×</span> <span class='key'>300</span> <span class='key'>)</span>" 
    },
    { 
        id: 84, 
        key: 'a', 
        topic: "Chemistry", 
        q: "When 0.5 g of liquid is completely evaporated and collected in a 1-liter manometer, the pressure is 0.25 atm and the temperature is 27°C. Find the molecular weight.", 
        options: {a: "49.2 g/mole", b: "12.3 g/mole", c: "2.2 g/mole", d: "64.0 g/mole"}, 
        ans: "49.2 g/mole", 
        soln: "Formula: MW = mRT / PV. MW = (0.5 * 0.0821 * 300) / (0.25 * 1) = 49.26 g/mole.", 
        caltech: "<span class='key'>0.5</span> <span class='key'>×</span> <span class='key'>0.0821</span> <span class='key'>×</span> <span class='key'>300</span> <span class='key'>÷</span> <span class='key'>0.25</span>" 
    },
    { 
        id: 85, 
        key: 'd', 
        topic: "Chemistry", 
        q: "A 150 liters of a solution has a 5.5 M (molarity), what is the total moles of solute?", 
        options: {a: "852", b: "828", c: "258", d: "825"}, 
        ans: "825", 
        soln: "Moles = Molarity * Volume. n = 5.5 moles/L * 150 L = 825 moles.", 
        caltech: "<span class='key'>5.5</span> <span class='key'>×</span> <span class='key'>150</span>" 
    },
    { 
        id: 86, 
        key: 'a', 
        topic: "Chemistry", 
        q: "In 100 g of CO2, calculate the amount of oxygen in grams.", 
        options: {a: "72.73", b: "27.37", c: "27.72", d: "72.27"}, 
        ans: "72.73", 
        soln: "MW of CO2 = 12 + 2(16) = 44. Mass of Oxygen = (32 / 44) * 100 = 72.73 grams.", 
        caltech: "<span class='key'>32</span> <span class='key'>÷</span> <span class='key'>44</span> <span class='key'>×</span> <span class='key'>100</span>" 
    },
    { 
        id: 87, 
        key: 'a', 
        topic: "Chemistry", 
        q: "A solution with 3.5 molarity used 50 kg of solvent, what is the moles of solute?", 
        options: {a: "175", b: "157", c: "571", d: "517"}, 
        ans: "175", 
        soln: "Assuming density of 1kg/L: Moles = 3.5 * 50 = 175.", 
        caltech: "<span class='key'>3.5</span> <span class='key'>×</span> <span class='key'>50</span>" 
    },
    { 
        id: 88, 
        key: 'd', 
        topic: "Chemistry", 
        q: "How many molecules are contained in 100 g of CH4?", 
        options: {a: "7.36x10^23", b: "7.36x10^24", c: "3.76x10^23", d: "3.76x10^24"}, 
        ans: "3.76x10^24", 
        soln: "MW of CH4 = 16. Moles = 100/16 = 6.25. Molecules = 6.25 * 6.022e23 = 3.76e24 molecules.", 
        caltech: "<span class='key'>6.25</span> <span class='key'>×</span> <span class='key'>6.022</span> <span class='key action'>EXP</span> <span class='key'>23</span>" 
    },
    { 
        id: 89, 
        key: 'c', 
        topic: "Materials", 
        q: "The ratio of stress to the corresponding strain below the proportional limit", 
        options: {a: "stress-strain diagram", b: "modulus of rigidity", c: "modulus of elasticity", d: "tensile strength"}, 
        ans: "modulus of elasticity", 
        soln: "According to Hooke's Law, Stress / Strain = Modulus of Elasticity (E) for values below the proportional limit.", 
        caltech: null 
    },
    { 
        id: 90, 
        key: 'a', 
        topic: "Mechanics", 
        q: "The moment of inertia of a rectangular area whose base is 'b' and height 'h' about its neutral axis is", 
        options: {a: "bh³/12", b: "bh³/3", c: "b²h/12", d: "b³h/3"}, 
        ans: "bh³/12", 
        soln: "The centroidal moment of inertia for a rectangle is defined as bh³/12. Note: Choice 'a' in your code used bh²/12; updated to correct formula.", 
        caltech: null 
    },
    { 
        id: 91, 
        key: 'c', 
        topic: "Mechanics", 
        q: "It is the stress that depends on the bending moment of a member or part", 
        options: {a: "tensile stress", b: "compressive stress", c: "flexural stress", d: "bearing stress"}, 
        ans: "flexural stress", 
        soln: "Flexural stress (or bending stress) is the internal stress caused by an external bending moment.", 
        caltech: null 
    },
    { 
        id: 92, 
        key: 'd', 
        topic: "Thermodynamics", 
        q: "An iron steam pipe is 200 ft long at 0°C. What will be its increase in length when heated to 100°C? Coefficient of linear expansion is 10x10^-6 per °C.", 
        options: {a: "0.18 ft", b: "0.12 ft", c: "0.26 ft", d: "0.20 ft"}, 
        ans: "0.20 ft", 
        soln: "ΔL = α * Lo * ΔT. ΔL = (10e-6)(200)(100 - 0) = 0.20 ft.", 
        caltech: "<span class='key'>10</span> <span class='key action'>EXP</span> <span class='key'>-6</span> <span class='key'>×</span> <span class='key'>200</span> <span class='key'>×</span> <span class='key'>100</span>" 
    },
    { 
        id: 93, 
        key: 'd', 
        topic: "Thermodynamics", 
        q: "A steel railroad rails 10 m long are laid with clearance of 3 mm at a temperature of 15°C. At what temperature will the rails just touch? Assume alpha = 11.7 micro m/m°C and E=200 GPa.", 
        options: {a: "46.90 deg", b: "56.06 deg", c: "50.36 deg", d: "40.64 deg"}, 
        ans: "40.64 deg", 
        soln: "Clearance = ΔL. 0.003 = α * L * ΔT. 0.003 = (11.7e-6)(10)(ΔT). ΔT = 25.64. Final Temperature = 15 + 25.64 = 40.64°C.", 
        caltech: "<span class='key'>.003</span> <span class='key'>÷</span> <span class='key'>(</span> <span class='key'>11.7</span> <span class='key action'>EXP</span> <span class='key'>-6</span> <span class='key'>×</span> <span class='key'>10</span> <span class='key'>)</span> <span class='key'>+</span> <span class='key'>15</span>" 
    },
    { 
        id: 94, 
        key: 'b', 
        topic: "Machine Design", 
        q: "A 1.5 cm solid shaft rotates at 1800 rpm. If the allowable torsional shearing stress is 50 MPa, what power in kW the said shaft can transmit?", 
        options: {a: "5.55", b: "6.24", c: "6.82", d: "8.23"}, 
        ans: "6.24", 
        soln: "Torque (T) = (π/16) * τ * d³. T = (π/16) * (50e6) * (0.015)³ = 33.13 N-m. Power = T * (2π * rpm / 60) = 33.13 * (2π * 1800 / 60) = 6245 W or 6.24 kW.", 
        caltech: "<span class='key'>π</span> <span class='key'>÷</span> <span class='key'>16</span> <span class='key'>×</span> <span class='key'>50</span> <span class='key action'>EXP</span> <span class='key'>6</span> <span class='key'>×</span> <span class='key'>0.015</span> <span class='key'>^</span> <span class='key'>3</span> <span class='key'>×</span> <span class='key'>2</span> <span class='key'>π</span> <span class='key'>×</span> <span class='key'>1800</span> <span class='key'>÷</span> <span class='key'>60</span>" 
    },
    { 
        id: 95, 
        key: 'd', 
        topic: "Mechanics", 
        q: "A 14-ft simple beam uniformly loaded with 200 lbs per foot over its entire length. If the beam is 3.625 in wide and 7.625 in deep, what is the maximum bending stress, in psi?", 
        options: {a: "7974", b: "8205", c: "6332", d: "1674"}, 
        ans: "1674", 
        soln: "M = wL²/8 = (200)(14)²/8 = 4900 lb-ft = 58,800 lb-in. S = I/c = (bh²/6) = (3.625 * 7.625²) / 6 = 35.12 in³. Stress = M/S = 58,800 / 35.12 = 1,674 psi.", 
        caltech: "<span class='key'>58800</span> <span class='key'>÷</span> <span class='key'>(</span> <span class='key'>3.625</span> <span class='key'>×</span> <span class='key'>7.625</span> <span class='key'>^</span> <span class='key'>2</span> <span class='key'>÷</span> <span class='key'>6</span> <span class='key'>)</span>" 
    },
    { 
        id: 96, 
        key: 'd', 
        topic: "Mechanics", 
        q: "What is the stress in an 8-inch round x 16-inch high concrete cylinder (E=2.5x10^6 psi) when the unit deformation is 0.0012 inch/inch?", 
        options: {a: "500 psi", b: "8100 psi", c: "210 psi", d: "3000 psi"}, 
        ans: "3000 psi", 
        soln: "Stress = Modulus (E) * Strain (ε). Stress = (2.5e6 psi) * (0.0012) = 3000 psi.", 
        caltech: "<span class='key'>2.5</span> <span class='key action'>EXP</span> <span class='key'>6</span> <span class='key'>×</span> <span class='key'>0.0012</span>" 
    },
    { 
        id: 97, 
        key: 'a', 
        topic: "Machine Design", 
        q: "A 2.5 in diameter shaft is 2 ft long. Its maximum shear stress is 10,000 psi. What is the angular deflection in degrees?", 
        options: {a: "0.96", b: "0.45", c: "0.78", d: "0.56"}, 
        ans: "0.96", 
        soln: "θ = TL/JG. Since τ_max = Tr/J, then T/J = τ_max/r. θ = (τ_max * L) / (r * G). G ≈ 12e6 psi. θ = (10,000 * 24) / (1.25 * 12e6) = 0.016 rad. θ = 0.016 * (180/π) = 0.916° (Closest to 0.96).", 
        caltech: "<span class='key'>240000</span> <span class='key'>÷</span> <span class='key'>(</span> <span class='key'>1.25</span> <span class='key'>×</span> <span class='key'>12</span> <span class='key action'>EXP</span> <span class='key'>6</span> <span class='key'>)</span> <span class='key'>×</span> <span class='key'>180</span> <span class='key'>÷</span> <span class='key'>π</span>" 
    },
    { 
        id: 98, 
        key: 'a', 
        topic: "Mechanics", 
        q: "A simply supported beam is five meters in length. It carries a uniformly distributed load including its own weight of 300 N/m and a concentrated load of 100 N, 2 meters from the left end. Find the reactions if reaction A at the left end and reaction B at the right end.", 
        options: {a: "RA=810 N, RB=700 N", b: "RA=820 N, RB=690 N", c: "RA=830 N, RB=680 N", d: "RA=840 N, RB=670 N"}, 
        ans: "RA=810 N, RB=700 N", 
        soln: "Total Uniform Load = 300*5 = 1500 N at center (2.5m). Sum of Moments at B = 0: RA(5) - 100(3) - 1500(2.5) = 0. 5RA = 4050. RA = 810 N. RB = Total - RA = 1600 - 810 = 790 N. (Note: Option 'a' states RB=700N, which is likely a typo in the original source).", 
        caltech: "<span class='key'>(</span> <span class='key'>100</span> <span class='key'>×</span> <span class='key'>3</span> <span class='key'>+</span> <span class='key'>1500</span> <span class='key'>×</span> <span class='key'>2.5</span> <span class='key'>)</span> <span class='key'>÷</span> <span class='key'>5</span>" 
    },
    { 
        id: 99, 
        key: 'd', 
        topic: "Mechanics", 
        q: "A 100 kg weight rests on a 30° inclined plane. Neglecting friction, how much pull must one exert to bring the weight up the incline?", 
        options: {a: "86.67 kg", b: "100 kg", c: "70.71 kg", d: "50 kg"}, 
        ans: "50 kg", 
        soln: "Force parallel to incline = W sin(θ). Force = 100 kg * sin(30°) = 100 * 0.5 = 50 kg.", 
        caltech: "<span class='key'>100</span> <span class='key'>sin</span> <span class='key'>30</span>" 
    },
    { 
        id: 100, 
        key: 'b', 
        topic: "Mechanics", 
        q: "A certain cable is suspended between two supports at the same elevation and 500 ft apart. The load is 500 lbs per horizontal foot including the weight of the cable. The sag of the cable is 30 ft. Calculate the total length of the cable, in ft.", 
        options: {a: "503.21", b: "504.76", c: "505.12", d: "506.03"}, 
        ans: "504.76", 
        soln: "Length of parabolic cable: S = L + (8d² / 3L). S = 500 + [8(30²) / (3 * 500)] = 500 + 4.8 = 504.8 ft.", 
        caltech: "<span class='key'>500</span> <span class='key'>+</span> <span class='key'>8</span> <span class='key'>×</span> <span class='key'>30</span> <span class='key'>^</span> <span class='key'>2</span> <span class='key'>÷</span> <span class='key'>(</span> <span class='key'>3</span> <span class='key'>×</span> <span class='key'>500</span> <span class='key'>)</span>" 
    }
];

// === QUIZ LOGIC ===

let currentMode = 'review';
let currentQuestions = [];
let userAnswers = {};
let practiceAttempts = {}; 
let examSubmitted = false;

const container = document.getElementById('questions-container');
const examDashboard = document.getElementById('exam-dashboard');
const practiceDashboard = document.getElementById('practice-dashboard');
const scoreDisplay = document.getElementById('score-display');
const examStatus = document.getElementById('exam-status');
const submitBtn = document.getElementById('submit-btn');

function setMode(mode) {
    currentMode = mode;
    ['review', 'practice', 'exam'].forEach(m => {
        document.getElementById(`btn-${m}`).className = `mode-btn ${mode === m ? 'active' : 'inactive'}`;
    });
    examDashboard.classList.toggle('hidden', mode !== 'exam');
    practiceDashboard.classList.toggle('hidden', mode !== 'practice');
    renderQuestions();
}

function resetExam() {
    userAnswers = {};
    examSubmitted = false;
    examStatus.innerText = "RUNNING";
    examStatus.classList.replace('text-[#00ff9d]', 'text-yellow-500');
    scoreDisplay.innerText = "--";
    submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    submitBtn.disabled = false;
    renderQuestions();
}

function resetPractice() {
    practiceAttempts = {};
    renderQuestions();
}

function selectExamOption(qId, option) {
    if (examSubmitted) return;
    userAnswers[qId] = option;
    renderQuestions();
}

function selectPracticeOption(qId, option) {
    if (practiceAttempts[qId]) return;
    const q = currentQuestions.find(item => item.id === qId);
    practiceAttempts[qId] = { selected: option, isCorrect: option === q.key };
    renderQuestions();
}

function submitExam() {
    if (examSubmitted) return;
    examSubmitted = true;
    let score = 0;
    currentQuestions.forEach(q => { if (userAnswers[q.id] === q.key) score++; });
    scoreDisplay.innerText = score;
    examStatus.innerText = "COMPLETED";
    examStatus.classList.replace('text-yellow-500', 'text-[#00ff9d]');
    submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
    submitBtn.disabled = true;
    renderQuestions();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderQuestions() {
    container.innerHTML = '';
    currentQuestions.forEach(item => {
        const isExam = currentMode === 'exam';
        const isPractice = currentMode === 'practice';
        const hasCalTech = item.caltech ? true : false;
        
        let cardClass = 'cyber-card rounded-lg p-6 flex flex-col gap-4';
        if (isExam && examSubmitted) {
            const sel = userAnswers[item.id];
            if (sel === item.key) cardClass += ' correct';
            else if (sel) cardClass += ' wrong';
        }
        if (isPractice && practiceAttempts[item.id]) {
            if (practiceAttempts[item.id].isCorrect) cardClass += ' correct';
            else cardClass += ' wrong';
        }

        const caltechBadge = hasCalTech ? 
            `<span class="bg-gray-800 border border-[#00f3ff] text-[#00f3ff] text-xs px-2 py-1 rounded font-mono flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-[#00f3ff] animate-pulse"></span> CALTECH
            </span>` : '';

        let html = `
            <div class="flex justify-between items-start">
                <div class="flex items-center gap-3">
                    <span class="text-3xl font-bold text-gray-700 font-mono">#${item.id}</span>
                    <span class="text-xs text-[#ff00ff] border border-[#ff00ff] px-2 rounded uppercase tracking-wider">${item.topic}</span>
                </div>
                ${(currentMode !== 'exam' && hasCalTech) ? caltechBadge : ''}
            </div>
            <div class="text-lg font-medium text-gray-200">${item.q}</div>`;

        if (isExam || isPractice) {
            html += `<div class="opt-container">`;
            ['a','b','c','d'].forEach(key => {
                let btnClass = 'opt-btn';
                let onclick = '';

                if (isExam) {
                    onclick = `selectExamOption(${item.id}, '${key}')`;
                    const sel = userAnswers[item.id];
                    if (examSubmitted) {
                        if (key === item.key) btnClass += ' correct-ans';
                        else if (sel === key) btnClass += ' wrong-ans';
                        else btnClass += ' dimmed';
                    } else if (sel === key) btnClass += ' selected';
                } 
                else if (isPractice) {
                    onclick = `selectPracticeOption(${item.id}, '${key}')`;
                    const attempt = practiceAttempts[item.id];
                    if (attempt) {
                        if (key === item.key) btnClass += ' correct-ans';
                        else if (attempt.selected === key) btnClass += ' wrong-ans';
                        else btnClass += ' dimmed';
                    }
                }
                html += `<div onclick="${onclick}" class="${btnClass}">
                    <div class="opt-letter">${key.toUpperCase()}</div>
                    <div class="flex-1">${item.options[key] || "Option "+key}</div>
                </div>`;
            });
            html += `</div>`;

            const showSoln = (isExam && examSubmitted) || (isPractice && practiceAttempts[item.id]);
            if (showSoln) {
                html += `
                <div class="mt-4 pt-4 border-t border-gray-800 text-sm animate-fade-in">
                    <div class="text-gray-300 bg-gray-900/80 p-3 rounded border-l-2 border-[#00ff9d]">
                        <div class="text-[#00ff9d] text-xs font-bold mb-1">SOLUTION:</div>
                        ${item.soln}
                    </div>
                    ${item.caltech ? `<div class="mt-2 bg-[#1a1a24] p-2 rounded border border-gray-700 font-mono text-xs text-gray-400">⌨️ ${item.caltech}</div>` : ''}
                </div>`;
            }
        } else {
            html += `
                <div class="mt-2 p-3 bg-black/40 border-l-2 border-yellow-500 text-yellow-500 font-mono text-sm">
                    ANSWER: ${item.ans} <span class="text-gray-500 text-xs ml-2">[Option ${item.key.toUpperCase()}]</span>
                </div>
                <button onclick="document.getElementById('soln-${item.id}').classList.toggle('hidden')" 
                    class="mt-auto w-full py-2 bg-[#1f1f2e] hover:bg-[#2d2d3a] text-gray-300 text-sm font-bold uppercase tracking-widest transition-colors border-t border-gray-700 flex justify-center items-center gap-2">
                    <span>View Protocol</span>
                </button>
                <div id="soln-${item.id}" class="hidden pt-4 border-t border-gray-800 space-y-4">
                    <div class="text-gray-400 text-sm">
                        <strong class="text-[#00f3ff]">SOLUTION:</strong><br>
                        <div class="mt-2">${item.soln}</div>
                    </div>
                    ${item.caltech ? `<div class="bg-[#1a1a24] p-3 rounded border border-gray-700 font-mono text-sm text-gray-300 leading-8">${item.caltech}</div>` : ''}
                </div>`;
        }

        const el = document.createElement('div');
        el.className = cardClass;
        el.innerHTML = html;
        container.appendChild(el);
    });
    if(window.MathJax) MathJax.typesetPromise();
}