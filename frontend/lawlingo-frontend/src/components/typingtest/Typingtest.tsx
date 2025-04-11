import { useState, useEffect, useRef, useMemo } from 'react';

type Props = {
    isDarkMode?: boolean;
    customTexts?: string[];
};

export default function TypingTest({ isDarkMode, customTexts }: Props) {
    const defaultTexts = [
        "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump! Sphinx of black quartz, judge my vow.",
        "Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using many programming languages.",
        "The five boxing wizards jump quickly. Amazingly few discotheques provide jukeboxes. The early bird catches the worm, but the second mouse gets the cheese.",
        "She sells seashells by the seashore. The shells she sells are surely seashells. So if she sells shells on the seashore, I'm sure she sells seashore shells."
    ];

    const availableTexts = customTexts?.length ? [...customTexts, ...defaultTexts] : defaultTexts;

    const [textIndex, setTextIndex] = useState(0);
    const [text, setText] = useState(availableTexts[0]);
    const [userInput, setUserInput] = useState("");
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);
    const [currentTime, setCurrentTime] = useState<number | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [mistakePositions, setMistakePositions] = useState<Set<number>>(new Set());
    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
    const [history, setHistory] = useState<Array<{ wpm: number, accuracy: number, date: Date }>>([]);

    const inputRef = useRef<HTMLTextAreaElement>(null);
    const textDisplayRef = useRef<HTMLDivElement>(null);

    // Calculate elapsedTime in real-time
    const elapsedTime = useMemo(() => {
        if (!startTime) return 0;
        return (currentTime || Date.now()) - startTime;
    }, [startTime, currentTime]);

    // Real-time WPM calculation
    const currentWPM = useMemo(() => {
        if (!startTime || !currentTime || currentIndex === 0) return 0;
        const minutes = elapsedTime / 60000;
        // Count words based on average word length of 5 characters
        const words = currentIndex / 5;
        return Math.round(words / minutes);
    }, [startTime, currentTime, currentIndex, elapsedTime]);

    // Real-time accuracy calculation
    const currentAccuracy = useMemo(() => {
        if (currentIndex === 0) return 100;
        return Math.round(((currentIndex - mistakePositions.size) / currentIndex) * 100);
    }, [currentIndex, mistakePositions]);

    // Final WPM and accuracy calculations
    const finalWPM = useMemo(() => {
        if (!startTime || !endTime) return 0;
        const minutes = (endTime - startTime) / 60000;
        // Count words based on average word length of 5 characters
        const words = text.length / 5;
        return Math.round(words / minutes);
    }, [startTime, endTime, text]);

    const finalAccuracy = useMemo(() => {
        if (!completed) return 100;
        return Math.round(((text.length - mistakePositions.size) / text.length) * 100);
    }, [completed, text.length, mistakePositions]);

    // Scroll text display to keep current character visible
    useEffect(() => {
        if (textDisplayRef.current && currentIndex > 0) {
            const characters = textDisplayRef.current.children;
            if (characters[currentIndex]) {
                characters[currentIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center'
                });
            }
        }
    }, [currentIndex]);

    // Update timer for real-time WPM and accuracy
    useEffect(() => {
        if (started && !completed) {
            const timer = setInterval(() => {
                setCurrentTime(Date.now());
            }, 100);
            setTimerId(timer);
            return () => clearInterval(timer);
        } else if (timerId) {
            clearInterval(timerId);
        }
    }, [started, completed]);

    // Focus input field on component mount
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // Save to local storage when history changes
    useEffect(() => {
        if (history.length > 0) {
            localStorage.setItem('typingTestHistory', JSON.stringify(history));
        }
    }, [history]);

    // Load history from local storage on mount
    useEffect(() => {
        const savedHistory = localStorage.getItem('typingTestHistory');
        if (savedHistory) {
            try {
                const parsed = JSON.parse(savedHistory);
                if (Array.isArray(parsed)) {
                    setHistory(parsed.map(item => ({
                        ...item,
                        date: new Date(item.date)
                    })));
                }
            } catch (e) {
                console.error('Failed to parse typing history');
            }
        }
    }, []);

    const resetTest = () => {
        setUserInput("");
        setStartTime(null);
        setEndTime(null);
        setCurrentTime(null);
        setCurrentIndex(0);
        setMistakes(0);
        setMistakePositions(new Set());
        setStarted(false);
        setCompleted(false);
        setShowResults(false);

        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const changeText = () => {
        const newIndex = (textIndex + 1) % availableTexts.length;
        setTextIndex(newIndex);
        setText(availableTexts[newIndex]);
        resetTest();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputValue = e.target.value;

        // Don't allow backspacing/editing in this version
        if (inputValue.length < userInput.length) {
            return;
        }

        // Start the timer if this is the first character
        if (!started && !completed) {
            setStarted(true);
            setStartTime(Date.now());
            setCurrentTime(Date.now());
        }

        // Only process the newly added character
        if (inputValue.length > userInput.length) {
            const newCharIndex = inputValue.length - 1;
            const newChar = inputValue[newCharIndex];
            const expectedChar = text[newCharIndex];

            // Check if the new character is correct
            if (newChar !== expectedChar) {
                setMistakes(prev => prev + 1);
                setMistakePositions(prev => {
                    const updated = new Set(prev);
                    updated.add(newCharIndex);
                    return updated;
                });
            }
        }

        setUserInput(inputValue);
        setCurrentIndex(inputValue.length);

        // Check if test is complete
        if (inputValue.length === text.length) {
            const now = Date.now();
            setEndTime(now);
            setCurrentTime(now);
            setCompleted(true);
            setShowResults(true);

            // Add result to history
            const newResult = {
                wpm: finalWPM,
                accuracy: finalAccuracy,
                date: new Date()
            };
            setHistory(prev => [newResult, ...prev.slice(0, 9)]); // Keep last 10 results
        }
    };

    const getPerformanceMessage = (wpm: number, accuracy: number) => {
        if (accuracy < 80) return "Focus on accuracy before speed.";
        if (wpm < 30) return "Keep practicing to improve your speed!";
        if (wpm < 50) return "Good job! You're typing at a decent speed.";
        if (wpm < 70) return "Very good! You're above average.";
        if (wpm < 90) return "Excellent! You're a fast typist.";
        return "Amazing! You're typing at professional speed!";
    };

    return (
        <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 transition-colors duration-300">
            <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Speed Typing Test</h1>

            {!showResults ? (
                <>
                    <div className="stats-bar flex justify-between mb-4">
                        <div className="stat-item text-gray-700 dark:text-gray-300">
                            <span className="font-medium">WPM: </span>
                            <span className={`font-bold ${started ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                                {started ? currentWPM : 0}
                            </span>
                        </div>
                        <div className="stat-item text-gray-700 dark:text-gray-300">
                            <span className="font-medium">Accuracy: </span>
                            <span className={`font-bold ${currentAccuracy > 95 ? 'text-green-600 dark:text-green-400' :
                                    currentAccuracy > 85 ? 'text-yellow-600 dark:text-yellow-400' :
                                        'text-red-600 dark:text-red-400'
                                }`}>
                                {currentAccuracy}%
                            </span>
                        </div>
                        <div className="stat-item text-gray-700 dark:text-gray-300">
                            <span className="font-medium">Time: </span>
                            <span className="font-bold">
                                {(elapsedTime / 1000).toFixed(1)}s
                            </span>
                        </div>
                        <div className="stat-item text-gray-700 dark:text-gray-300">
                            <span className="font-medium">Progress: </span>
                            <span className="font-bold">
                                {Math.round((currentIndex / text.length) * 100)}%
                            </span>
                        </div>
                    </div>

                    <div
                        ref={textDisplayRef}
                        className="mb-6 p-4 rounded-md bg-gray-100 dark:bg-gray-700 overflow-x-hidden whitespace-pre-wrap"
                        style={{ height: '120px', overflowY: 'auto', lineHeight: '1.8' }}
                    >
                        {text.split("").map((char, index) => {
                            let charClass = "text-gray-500 dark:text-gray-400";

                            if (index < currentIndex) {
                                charClass = mistakePositions.has(index)
                                    ? "text-red-600 dark:text-red-400 font-medium bg-red-100 dark:bg-red-900"
                                    : "text-green-600 dark:text-green-400 font-medium";
                            } else if (index === currentIndex) {
                                charClass = "bg-blue-200 dark:bg-blue-700 text-gray-800 dark:text-gray-200 px-1 border-b-2 border-blue-600 animate-pulse";
                            }

                            return (
                                <span key={index} className={charClass + " text-lg"}>
                                    {char}
                                </span>
                            );
                        })}
                    </div>

                    <div className="mb-6">
                        <textarea
                            ref={inputRef}
                            value={userInput}
                            onChange={handleInputChange}
                            disabled={completed}
                            className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-mono text-lg"
                            rows={3}
                            placeholder="Start typing here..."
                            aria-label="Typing input area"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            * Backspace is disabled. Focus on accuracy!
                        </p>
                    </div>
                </>
            ) : (
                <div className="mb-6 p-6 rounded-md bg-gray-50 dark:bg-gray-700">
                    <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Test Complete!</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="p-4 rounded-md bg-white dark:bg-gray-800 shadow">
                            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Your Performance</h3>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-600 dark:text-gray-400">Speed:</span>
                                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{finalWPM} WPM</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-600 dark:text-gray-400">Accuracy:</span>
                                <span className="text-2xl font-bold text-green-600 dark:text-green-400">{finalAccuracy}%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Time:</span>
                                <span className="text-xl font-bold text-gray-700 dark:text-gray-300">
                                    {((endTime! - startTime!) / 1000).toFixed(1)}s
                                </span>
                            </div>
                            <p className="mt-4 text-gray-700 dark:text-gray-300 font-medium">
                                {getPerformanceMessage(finalWPM, finalAccuracy)}
                            </p>
                        </div>

                        <div className="p-4 rounded-md bg-white dark:bg-gray-800 shadow">
                            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Recent History</h3>
                            {history.length > 0 ? (
                                <div className="max-h-40 overflow-y-auto">
                                    {history.map((result, idx) => (
                                        <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">
                                                {result.date.toLocaleDateString()} {result.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                            <div className="flex gap-4">
                                                <span className="font-medium text-blue-600 dark:text-blue-400">{result.wpm} WPM</span>
                                                <span className="font-medium text-green-600 dark:text-green-400">{result.accuracy}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400">No previous attempts recorded</p>
                            )}
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                            Want to improve? Regular practice is key!
                        </p>
                    </div>
                </div>
            )}

            <div className="flex flex-wrap gap-4">
                <button
                    onClick={resetTest}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    {completed ? "Try Again" : "Reset"}
                </button>

                <button
                    onClick={changeText}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                    Change Text
                </button>

                {showResults && (
                    <button
                        onClick={() => {
                            setShowResults(false);
                            if (inputRef.current) {
                                inputRef.current.focus();
                            }
                        }}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        View Test
                    </button>
                )}
            </div>
        </div>
    );
}