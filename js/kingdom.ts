/**
 * Created by mmontaque on 5/7/17.
 */


/**
 * @interface Subject
 * @property {string} element - HTML element that you want to create
 * @property {string} [textAsString] - inserts string into the virtual element
 * @property {string} [textAsHTML] - inserts html given as string to the virtual element
 * @property {Object} [properties] - key value pair of properties for HTML {Element}
 * @property {Object} [setAttributes] - allows you to set attribute on the element using setAttribute method
 * @property {Array<Subject>} [subjects] - children of the current subject.
 */
export interface Subject{
    element: string,
    textAsHTML?: string,
    textAsString?: string,
    properties?: {},
    setAttributes?:{},
    subjects?: Array <Subject>, //AKA: Children

}


export class Kingdom {
    private king: Subject; //AKA: Root
    private _delegateLord : Subject; // AKA: Pointer

    /**
     * @constructor
     * Create an empty kingdom. If data is supplied then it is made the root node.
     * @param {Subject} subject - the given subject will initialize the kingdom and become king (root node)
     */
    constructor(subject: Subject = {element:'', subjects: []}){

        if(typeof subject !== "object" || Array.isArray(subject))
            throw new Error("Constructor did not receive the expected type object");

        // Make sure the subject has its subjects initialized
        subject.subjects = subject.subjects || [];

        // sets the given subject as the king (root node)
        this.king = subject;

        // the delegate lord is also the king since the king has no subjects to be delegate lord
        this._delegateLord = this.king;

    }


    /**
     * Retrieves the current node
     * @return {Subject}
     */
    get delegateLord(): Subject{
        return this._delegateLord
    }

    /**
     * Internally moves the current node up one level. If the node is the parent then it does nothing
     * @return {Kingdom}
     */
    getLord():Kingdom{
        let result : Subject | void;

        if(this._delegateLord === this.king)
            return this;
        else
            result = this.findParentOfChild(this._delegateLord, this.king)

        if( this.isSubject(result))
            this._delegateLord = result;

        return this
    }

    /**
     * Adds data as a child to the current node. if makeLord is true then the given subject becomes the new current node
     * @param {Subject} subject - the element you want to add
     * @param {Boolean} makeLord - if true, sets the given subject as lord (current node) and subsequent calls to
     * addSubject will be assigned to this current subject
     * @return {Kingdom}
     */
    addSubject (subject : Subject, makeLord?: boolean) : Kingdom  {

        if(typeof subject !== "object" || Array.isArray(subject))
            throw new Error("addSubject did not receive the expected type object");

        subject.subjects = subject.subjects || [];

        // Add the subject to the list of subjects under the delegate lord
        if(!this._delegateLord.subjects)
            this._delegateLord.subjects = [subject];
        else
            this._delegateLord.subjects.push(subject);

        // if true, promote the given subject as delegate lord
        if(makeLord)
            this._delegateLord =  subject;

        return this
    }

    /**
     * Internally changes the current node to the child at the given index. The current node remains the same on failure
     * @param {Numbder} index - index of the subject you want to make current node
     * @return {Kingdom}
     */
    makeSubjectLordAtIndex(index : number) : Kingdom {
        const youCanProceed = this.checkSubjectAtIndex(index);

        if(youCanProceed)
            this._delegateLord = this._delegateLord.subjects[index];

        return this;
    }

    /**
     * Internally changes the current node to the root node
     * @return {Kingdom}
     */
    gotoKing() : Kingdom {
        this._delegateLord = this.king;
        return this
    }

    /**
     * Removes the {Subject} at the specified index. Returns false on failure.
     * @param {Number} index - index of the {Subject} you want to remove
     * @return {boolean} - returns true on success
     */
    detachSubjectAtIndex(index: number) : boolean {
        const youCanProceed = this.checkSubjectAtIndex(index);

        if(youCanProceed)
            this._delegateLord.subjects.splice(index, 1);

        return youCanProceed
    }

    /**
     * Removes all the children of the current node.
     * @return {Kingdom}
     */
    banishSubjectsForCurrentLord() : Kingdom {
        this._delegateLord.subjects = [];

        return this
    }

    /**
     * Removes all the nodes and internally resets the current node to point to the root.
     * @return {Kingdom}
     */
    destroyKingdom() : Kingdom {

        this.king = this.getSmallestSubject();

        this._delegateLord =  this.king;

        return this
    }

    /**
     * returns the DOM structure starting at the root node. If startAtCurrent is true then generates the DOM from
     * the current node instead.
     * @param {boolean} startAtCurrent - only renders from the current node down
     * @return {DocumentFragment} returns the DOM
     */
    buildKingdom(startAtCurrent: boolean) : DocumentFragment {
        // Keep reference to the current delegate lord
        let currentLord = this._delegateLord;

        // determine which point to start from
        let subject : Subject = startAtCurrent && this._delegateLord || this.gotoKing() && this._delegateLord;

        // return the delegate lord back to normal
        this._delegateLord =  currentLord;

        // Build!!
        return this.build(subject);
    }


    /**
     * returns the virtual dom as a string.
     * It will not include functions or complex structures
     * not supported by JSON.stringify and JSON.parse
     *
     * @return {string} stringify version of the virtual DOM
     */
    createCensus(): string{
        return JSON.stringify(this.king, null, 4);
    }


    private isSubject(subject : Subject | any) : subject is Subject{
        return (<Subject> subject).element !== undefined;
    }

    private findParentOfChild(child: Subject, delegateLord: Subject) : Subject | void {

        if(!!delegateLord && !!delegateLord.subjects) {

            if (delegateLord.subjects.indexOf(child) >= 0)
                return delegateLord;


            for (let subject of delegateLord.subjects) {
                let result = this.findParentOfChild(child, subject)

                if (result)
                    return result
            }

        }
    }

    private getSmallestSubject() : Subject {

        return {element:'', subjects: []};
    }

    private build(delegateLord: Subject) : DocumentFragment {
        // Create a tuple containing the HTML fragment and boolean indicating if fragment contains an element
        let elementTuple : [DocumentFragment, boolean] = this.createSelf(delegateLord);
        let fragment : DocumentFragment = elementTuple[0];
        let element : DocumentFragment;

        // determine which element to which to append
        if(elementTuple[1])
            element = <any>fragment.firstElementChild;
        else
            element =  fragment;

        if(!!delegateLord.subjects && !!element){
            // Go through the subjects of the delegate lord and have each build a kingdom to add
            for(let subject of delegateLord.subjects){
                console.log(element)
                element.appendChild(this.build(subject))
            }
        }


        return fragment;
    }

    private createSelf (data : Subject) : [DocumentFragment, boolean] {
        let fragment = document.createDocumentFragment();

        // If there is no element to create then return a fragment
        if(!data.element)
            return [fragment, false]


        let element = document.createElement(data.element);

        if (!!data.textAsHTML)
            element.innerHTML =  data.textAsHTML;

        else if (!!data.textAsString)
            element.innerText =  data.textAsString;


        this.setPropertiesAndAttributes(element, data.properties, data.setAttributes);


        fragment.appendChild(element);

        return [fragment, true];

    }

    private setPropertiesAndAttributes(el : Element, prop: any, attr?: any){

        for(let key in attr){
            var val = attr[key];
            el.setAttribute(key, val);
        }

        for(let key in prop){

            // get the value for key in the property we are copying
            var val = prop[key];

            // if the type is an object recursively try again
            if(typeof val === 'object' && typeof val !== 'function')
                this.setPropertiesAndAttributes(el[key], val);

            // otherwise set the value in the element
            else {
                el[key] = val
            }
        }
    }

    private checkSubjectAtIndex(index: number):boolean{

        if(isNaN(index) || Array.isArray(index))
            throw new Error('The index given was not a number');

        else if(this._delegateLord.subjects && this._delegateLord.subjects.length > index)
            return true;

        else
            console.error('There are no subjects at index = ', index);

        return false
    }
}


