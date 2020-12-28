import {difference, uniq} from "lodash";

export const ORDERSTATUSES = {
  adoptable: "Adoptable Kittehs",
  "needs_foster": "Kittehs Needing Foster",
  "needs_rescue": "Kitteshs Needing Rescue",
  adopted: "Adopted Kittehs",
  "needs_transport": "Kittehs Needing Transport",
  "in_foster": "Kittehs In Foster",
}

export const filterStatuses = (animals, excludeStatuses, filterCallback) => {
  let statuses = Object.keys(ORDERSTATUSES);
  const filterAnimals = animals.reduce((acc, animal) => {
    statuses = uniq([...statuses, ...animal.statuses]);
    animal.statuses.forEach(status => {
      if (!filterCallback || (filterCallback && filterCallback(animal, status))) {
        if (acc[status]) {
          acc[status].push(animal);
        } else {
          acc[status] = [animal];
        }
      }
    });
    return acc;
  }, {});
  const filteredStatuses = [...new Set(statuses)].filter(status => filterAnimals[status]);
  return { statuses: difference(filteredStatuses, excludeStatuses), animals: filterAnimals};
};