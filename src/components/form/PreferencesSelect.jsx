import Label from "@/components/form/Label";
import Category from "@/components/category/Category";
import generateId from "@/utilities/generateId";

const PreferencesSelect = ({ label, onSelect, categoryList, locationCategories }) => {
  return (
    <div>
      <Label>{label}</Label>

      <div className="flex flex-wrap gap-2 mt-2">
        {categoryList.map((item) => (
          <Category
            isActive={locationCategories.includes(item.title)}
            onClick={onSelect}
            key={generateId()}
          >
            {item.title}
          </Category>
        ))}
      </div>
    </div>
  );
};

export default PreferencesSelect;
