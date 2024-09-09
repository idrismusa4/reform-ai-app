'use client'

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BarChart, PieChart, Activity, Users, FileText, Settings, LogOut, Home, ChevronDown } from 'lucide-react';

const questionTypes = [
  { value: "text", label: "Text" },
  { value: "multipleChoice", label: "Multiple Choice" },
  { value: "rating", label: "Rating" },
];

export default function SurveyBuilder() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [questions, setQuestions] = useState([
    { id: "q1", type: "text", content: "What's your name?" },
    { id: "q2", type: "multipleChoice", content: "How satisfied are you with our service?", options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"] },
  ]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newQuestions = Array.from(questions);
    const [reorderedItem] = newQuestions.splice(result.source.index, 1);
    newQuestions.splice(result.destination.index, 0, reorderedItem);
    setQuestions(newQuestions);
  };

  return (
    <div className="flex h-screen bg-white text-black">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } flex flex-col justify-between bg-gray-200 text-gray-900 transition-all duration-300 ease-in-out`}
      >
        <div>
          {/* Sidebar Header */}
          <div className="p-4 flex flex-col items-center">
            <h2 className={`text-2xl font-bold ${isSidebarOpen ? '' : 'hidden'}`}>Reform</h2>
            <button
              className="mt-4 p-2 rounded-full hover:bg-gray-300"
              onClick={toggleSidebar}
            >
              <ChevronDown
                className={`h-6 w-6 transition-transform ${
                  isSidebarOpen ? 'rotate-0' : '-rotate-90'
                }`}
              />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="mt-8">
            {[
              { icon: <Home className="h-5 w-5 mr-2" />, label: 'Dashboard' },
              { icon: <FileText className="h-5 w-5 mr-2" />, label: 'Surveys' },
              { icon: <Users className="h-5 w-5 mr-2" />, label: 'Audience' },
              { icon: <BarChart className="h-5 w-5 mr-2" />, label: 'Analytics' },
              { icon: <Settings className="h-5 w-5 mr-2" />, label: 'Settings' },
            ].map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center px-4 py-2 text-left hover:bg-gray-300 hover:text-black transition-colors mb-2 ${
                  item.label === 'Surveys' ? 'bg-gray-300 text-black' : ''
                }`}
              >
                {item.icon}
                {isSidebarOpen && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>

        {/* Account Button */}
        <div className="relative p-4">
          <button
            className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-300 hover:text-black transition-colors"
            onClick={toggleDropdown}
          >
            <img
              src="/avatars/01.png"
              alt="@username"
              className="h-8 w-8 rounded-full mr-2"
            />
            {isSidebarOpen && <span>John Doe</span>}
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute bottom-12 left-0 w-56 bg-white border rounded-lg shadow-lg">
              <div className="p-4">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500">john@example.com</p>
              </div>
              <hr />
              <button className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-300 hover:text-black">
                <Settings className="mr-2 h-4 w-4" />
                Account settings
              </button>
              <button className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-300 hover:text-black">
                <Settings className="mr-2 h-4 w-4" />
                AI settings
              </button>
              <hr />
              <button className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-300 hover:text-black">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-hidden">
        <h1 className="text-3xl font-bold mb-6">Survey Builder</h1>
        <div className="flex gap-6">
          <div className="w-1/4">
            <div className="border border-gray-200 rounded-lg p-4 shadow-lg bg-white">
              <h2 className="text-xl font-bold mb-2">Question Types</h2>
              <div>
                {questionTypes.map((type) => (
                  <button
                    key={type.value}
                    className="w-full mb-2 py-2 border border-gray-200 rounded-md hover:bg-gray-100"
                    onClick={() =>
                      setQuestions([
                        ...questions,
                        { id: `q${questions.length + 1}`, type: type.value, content: "" },
                      ])
                    }
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="w-3/4">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="questions">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {questions.map((question, index) => (
                      <Draggable key={question.id} draggableId={question.id} index={index}>
                        {(provided) => (
                          <div
                            className="border border-gray-200 rounded-lg p-4 mb-4 shadow-lg bg-white"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <select
                              className="w-full border border-gray-200 rounded-md p-2"
                              value={question.type}
                              onChange={(e) => {
                                const newQuestions = [...questions];
                                newQuestions[index].type = e.target.value;
                                setQuestions(newQuestions);
                              }}
                            >
                              {questionTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                  {type.label}
                                </option>
                              ))}
                            </select>
                            <textarea
                              className="w-full mt-2 p-2 border border-gray-200 rounded-md"
                              value={question.content}
                              onChange={(e) => {
                                const newQuestions = [...questions];
                                newQuestions[index].content = e.target.value;
                                setQuestions(newQuestions);
                              }}
                              placeholder="Enter your question here"
                            />
                            {question.type === "multipleChoice" && (
                              <div className="mt-2">
                                {question.options?.map((option, optionIndex) => (
                                  <input
                                    key={optionIndex}
                                    className="w-full mb-2 p-2 border border-gray-200 rounded-md"
                                    value={option}
                                    onChange={(e) => {
                                      const newQuestions = [...questions];
                                      newQuestions[index].options[optionIndex] = e.target.value;
                                      setQuestions(newQuestions);
                                    }}
                                    placeholder={`Option ${optionIndex + 1}`}
                                  />
                                ))}
                                <button
                                  className="w-full py-2 border border-gray-200 rounded-md hover:bg-gray-100"
                                  onClick={() => {
                                    const newQuestions = [...questions];
                                    newQuestions[index].options = [
                                      ...(newQuestions[index].options || []),
                                      "",
                                    ];
                                    setQuestions(newQuestions);
                                  }}
                                >
                                  Add Option
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Save Survey
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
