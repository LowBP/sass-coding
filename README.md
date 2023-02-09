# task1 (react, redux, api)
- implement a list view with news from the Hacker News API (more info in the ``actions.js``)
- implement as much as you think is needed to show us your experience
- also implement a pagination with for example 10 items per page

# task2 (extend functionality, refactoring)
we have an online shop with products. the structure of an item is:
```
{
  type: string, // TICKETS or NORMAL
  sellIn: number, // e.g. days
  quality: number, // arbitrary number e.g. 50
  isSecondHand: boolean, // only NORMAL items
}
```
the items need to be updated each day, depending on the item type:
- the quality of items decreases by 1 each day
- if the sellIn is 0, item quality decreases twice as fast
- quality is never below 0
- quality of items of type ``TICKETS`` increases by 1
    - if sellIn is below 10, the quality increases twice as fast (by 2)
    - if sellIn turns to 0, the quality drops to 0 as well
- the sellIn decreases by 1 each day, never below 0

task:
- we are starting to sell second hand items (property name is ``isSecondHand``). their quality decreases by 2 each day even if the sellIn is greater than 0
- please implement this new functionality but be careful not to break existing code
- you are even allowed to refactor or drop the whole existing code
- to work on this, go to ``App.js`` and comment in the ``Task2`` import

**Please submit your solution as a GitHub repo where we can see the commit history**
