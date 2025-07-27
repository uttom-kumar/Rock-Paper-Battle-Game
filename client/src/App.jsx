import React, { useState } from "react";
import {MdDarkMode} from "react-icons/md";
import {FiSun} from "react-icons/fi";

const choices = ["rock", "paper", "scissors"];

const getResult = (player, computer) => {
    if (player === computer) return "It's a Draw";
    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    )
        return "You Win!";
    return "You Lose!";
};

const App = () => {
    const [playerChoice, setPlayerChoice] = useState("");
    const [computerChoice, setComputerChoice] = useState("");
    const [result, setResult] = useState("");
    const [score, setScore] = useState({ win: 0, lose: 0, draw: 0 });
    const [darkMode, setDarkMode] = useState(true);

    const play = (choice) => {
        const compChoice = choices[Math.floor(Math.random() * 3)];
        const outcome = getResult(choice, compChoice);

        setPlayerChoice(choice);
        setComputerChoice(compChoice);
        setResult(outcome);

        setScore((prev) => {
            if (outcome === "You Win!") return { ...prev, win: prev.win + 1 };
            if (outcome === "You Lose!") return { ...prev, lose: prev.lose + 1 };
            return { ...prev, draw: prev.draw + 1 };
        });
    };

    const getEmoji = (choice) => {
        if (choice === "rock") return "✊";
        if (choice === "paper") return "✋";
        if (choice === "scissors") return "✌️";
        return "";
    };

    return (
        <div
            className={`flex flex-col items-center justify-center min-h-screen transition-colors duration-500 px-4 ${
                darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
            }`}
        >
            {/* Header */}
            <div className="flex justify-between w-full max-w-md mb-6">
                <h1 className="text-3xl font-bold">Rock Paper Scissors</h1>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="cursor-pointer px-3 py-1 rounded-md bg-indigo-500 text-white hover:bg-indigo-700 transition"
                >
                    {darkMode ? <FiSun /> : <MdDarkMode />}
                </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mb-8">
                {choices.map((choice) => (
                    <button
                        key={choice}
                        onClick={() => play(choice)}
                        className={`px-6 py-3 rounded-xl text-lg capitalize font-semibold shadow-md transition-transform transform hover:scale-105 ${
                            darkMode
                                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                : "bg-indigo-500 hover:bg-indigo-600 text-white"
                        }`}
                    >
                        {choice}
                    </button>
                ))}
            </div>

            {/* Choices display */}
            <div
                key={playerChoice + computerChoice}
                className="flex items-center justify-center gap-12 mb-6 text-5xl"
            >
                <div
                    className={`flex flex-col items-center ${
                        playerChoice && "animate-bounce"
                    }`}
                >
                    <span>👤</span>
                    <span>{getEmoji(playerChoice)}</span>
                </div>

                <div className="text-3xl font-bold">VS</div>

                <div
                    className={`flex flex-col items-center ${
                        computerChoice && "animate-bounce"
                    }`}
                >
                    <span>💻</span>
                    <span>{getEmoji(computerChoice)}</span>
                </div>
            </div>

            {/* Result */}
            <div
                className={`text-2xl font-bold mb-4 ${
                    result === "You Win!"
                        ? "text-green-400"
                        : result === "You Lose!"
                            ? "text-red-400"
                            : "text-yellow-400"
                }`}
            >
                {result}
            </div>

            {/* Score */}
            <div className="text-lg font-medium">
                Won: {score.win} | Lost: {score.lose} | Draw: {score.draw}
            </div>
        </div>
    );
};

export default App;