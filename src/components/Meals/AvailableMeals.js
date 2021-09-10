import { useEffect, useState,useCallback } from "react";
 
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import styles from "./AvailableMeals.module.css";
 
const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading,setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState();

  const fetchMeals = useCallback(async () => {
    try {
      const response = await fetch(
      'https://reactfoodapp-1e874-default-rtdb.firebaseio.com/meals.json'
    );
    if(!response.ok) {
      throw Error('Error fetching meals')
    }
    const meals = await response.json();

    const loadedMeals = [];

    for (const meal in meals) {
      loadedMeals.push({
        id: meal,
        name: meals[meal].name,
        description: meals[meal].description,
        price: meals[meal].price,
      });
    }

    setMeals(loadedMeals);
    setIsLoading(false);
    } catch(e) {
      console.log(e.message);
    }
  },[]);

  useEffect(() => {
    fetchMeals().catch(e=> {
        setIsLoading(false);
        setHttpError(e.message);
      });
    }, [fetchMeals]);

  if(isLoading) {
    return <section className = {styles.mealsLoading}><p>Loading...</p></section>
  }

  if(httpError) {
    return <section className={styles.mealsError}><p>{httpError}</p></section>
  }
 
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
 
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
 
export default AvailableMeals;
