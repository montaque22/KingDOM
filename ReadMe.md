Work in progress...

### Table of Contents

-   [Kingdom](#kingdom)
    -   [delegateLord](#delegatelord)
    -   [getLord](#getlord)
    -   [addSubject](#addsubject)
    -   [makeSubjectLordAtIndex](#makesubjectlordatindex)
    -   [gotoKing](#gotoking)
    -   [banishSubjectAtIndex](#banishsubjectatindex)
    -   [banishSubjectsForCurrentLord](#banishsubjectsforcurrentlord)
    -   [destroyKingdom](#destroykingdom)
    -   [buildKingdom](#buildkingdom)
    -   [createCensus](#createcensus)

## Kingdom

Created by mmontaque on 5/7/17.

**Parameters**

-   `subject`   (optional, default `{element:'',subjects:[]}`)

### delegateLord

Retrieves the current node

Returns **Subject** 

### getLord

Internally moves the current node up one level. If the node is the parent then it does nothing

Returns **[Kingdom](#kingdom)** 

### addSubject

Adds data as a child to the current node. if makeLord is true then the given subject becomes the new current node

**Parameters**

-   `subject` **Subject** the element you want to add
-   `makeLord` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** if true, sets the given subject as lord (current node) and subsequent calls to
    addSubject will be assigned to this current subject

Returns **[Kingdom](#kingdom)** 

### makeSubjectLordAtIndex

Internally changes the current node to the child at the given index. The current node remains the same on failure

**Parameters**

-   `index` **Numbder** index of the subject you want to make current node

Returns **[Kingdom](#kingdom)** 

### gotoKing

Internally changes the current node to the root node

Returns **[Kingdom](#kingdom)** 

### banishSubjectAtIndex

Removes the {Subject} at the specified index. Returns false on failure.

**Parameters**

-   `index` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** index of the {Subject} you want to remove

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** returns true on success

### banishSubjectsForCurrentLord

Removes all the children of the current node.

Returns **[Kingdom](#kingdom)** 

### destroyKingdom

Removes all the nodes and internally resets the current node to point to the root.

Returns **[Kingdom](#kingdom)** 

### buildKingdom

returns the DOM structure starting at the root node. If startAtCurrent is true then generates the DOM from
the current node instead.

**Parameters**

-   `startAtCurrent` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** only renders from the current node down

Returns **[DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment)** returns the DOM

### createCensus

returns the virtual dom as a string.
It will not include functions or complex structures
not supported by JSON.stringify and JSON.parse

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** stringify version of the virtual DOM
