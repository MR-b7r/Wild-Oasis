import { useEffect, useState } from "react";
import { COUNTRY_MAX_LENGTH } from "../utils/constants";

const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`https://flagcdn.com/en/codes.json`);
        const data = await response.json();
        const country = Object.entries(data).map(([code, name]) => ({
          value: code,
          label:
            name.slice(0, COUNTRY_MAX_LENGTH) +
            (name.length > COUNTRY_MAX_LENGTH ? "..." : ""),
          flagUrl: `https://flagcdn.com/${code}.svg`,
        }));
        setCountries(country);
      } catch (error) {
        console.error("Error fetching country flags:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, []);
  return { countries, isLoading };
};

export default useCountries;
