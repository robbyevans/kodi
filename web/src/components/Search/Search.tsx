import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import * as S from "./styles";

// Define the suggestion type
interface Suggestion {
  type: "property" | "house" | "tenant";
  id: number;
  propertyId?: number; // For houses and tenants
  display: string;
}

// Add prop interface to receive visibility state
interface SearchProps {
  isVisible: boolean;
}

const Search: React.FC<SearchProps> = ({ isVisible }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const properties = useSelector((state: RootState) => state.properties.data);
  const houses = useSelector((state: RootState) => state.houses.data);
  const tenants = useSelector((state: RootState) => state.tenants.data);

  // Build suggestions based on query
  const suggestions: Suggestion[] = useMemo(() => {
    if (!query.trim()) return [];
    const queryLower = query.toLowerCase();
    const results: Suggestion[] = [];

    // Search properties by name
    properties.forEach((property) => {
      if (property.name.toLowerCase().includes(queryLower)) {
        results.push({
          type: "property",
          id: property.id as number,
          display: `Property: ${property.name}`,
        });
      }
    });

    // Search houses by house_number
    houses.forEach((house) => {
      if (house.house_number.toLowerCase().includes(queryLower)) {
        results.push({
          type: "house",
          id: house.id,
          propertyId: house.property_id,
          display: `House: ${house.house_number}`,
        });
      }
    });

    // Search tenants by name.
    tenants.forEach((tenant) => {
      if (tenant.name.toLowerCase().includes(queryLower)) {
        // Find the house that has this tenant
        const associatedHouse = houses.find(
          (house) => house.tenant && house.tenant.id === tenant.id
        );
        results.push({
          type: "tenant",
          id: tenant.id,
          propertyId: associatedHouse ? associatedHouse.property_id : 0, // Fallback if not found
          display: associatedHouse
            ? `Tenant: ${tenant.name} (House: ${associatedHouse.house_number})`
            : `Tenant: ${tenant.name}`,
        });
      }
    });

    return results;
  }, [query, properties, houses, tenants]);

  const handleSuggestionClick = (suggestion: Suggestion) => {
    if (suggestion.type === "property") {
      navigate(`/property/${suggestion.id}`);
    } else if (suggestion.type === "house") {
      navigate(`/property/${suggestion.propertyId}`, {
        state: { highlightHouseId: suggestion.id },
      });
    } else if (suggestion.type === "tenant") {
      navigate(`/property/${suggestion.propertyId}`, {
        state: { highlightTenantId: suggestion.id },
      });
    }
    setQuery("");
  };

  return (
    <S.SearchContainer isVisible={isVisible}>
      <S.SearchInput
        type="text"
        placeholder="Search estates, houses, tenants..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && suggestions.length > 0 && (
        <S.SuggestionsDropdown>
          {suggestions.map((suggestion) => (
            <S.SuggestionItem
              key={`${suggestion.type}-${suggestion.id}`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.display}
            </S.SuggestionItem>
          ))}
        </S.SuggestionsDropdown>
      )}
    </S.SearchContainer>
  );
};

export default Search;
