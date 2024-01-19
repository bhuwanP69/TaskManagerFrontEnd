import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams } from 'next/navigation';
import { MyContext } from './MyContext';
import { getData } from './AllTasks'; // Import the getData function from AllTasks
type Task = {
    _id: any; 
    task: any;
    
  };
export default function CombinedTasks() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { inputValue } = useContext(MyContext);
  const searchParam = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await getData();
        setAllTasks(tasks);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Get the search query
  const searchQuery = searchParam && searchParam.get('q');

  // Filter tasks based on the search query
  const filteredTasks = allTasks.filter((task:any) => {
    if (searchQuery) {
      return task.task.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      return true;
    }
  });

  return (
    <div className="combinedTasks pt-20">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filteredTasks.map((task) => (
            <li key={task._id}>
              {/* Render your task item as needed */}
              <h2>{task.task}</h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}