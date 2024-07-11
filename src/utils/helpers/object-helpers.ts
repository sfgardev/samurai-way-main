import { UserType } from "../../redux/users-reducer";
// type das = keyof UserType

export const updateObjecInArray = (
  items: UserType[],
  id: number,
  objectPropName: keyof UserType,
  newObjProps: Partial<UserType>
): UserType[] => {
  return items.map((item: any) =>
    item[objectPropName] === id ? { ...item, ...newObjProps } : item
  );
};
