/// <reference path="../../typings/tsd.d.ts" />
import math = require("../lib/math");
import _ = require("../lib/lodash");
//var math = Libs.math;

var Note = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];
function createNoteList() {

}

// what does this do?
function matchToSum(list: number[], mCount: number){
    var finalDeq: number[] = [],
        sum = 0;
    _.forEach(list, function (item, ind) {
        var temp = sum + item,
            tempMatch: number;
        if(temp > mCount){
            if((mCount-sum) < temp){
                tempMatch = finalDeq.pop() | 0;
                tempMatch += mCount - sum;
            } else {
                tempMatch = list.shift();
                tempMatch -= temp - mCount;
            }
            sum = 0;
        } else {
            tempMatch = list.shift();
            sum += tempMatch;
        }
        finalDeq.push(tempMatch);
    });
    return finalDeq;
}
var MajorKey = [0,2,4,5,7,9,11],
    NatMinor = [0,2,3,4,7,8,10],
    HarmMinor = [0,2,3,5,7,8,11];
class Key {
    //NoteList: ;
    key: number[];
    baseNote: string;
    baseInd: number;
    constructor(baseNote: string, key: number[] = MajorKey){
        this.key = key;
        this.baseNote = baseNote.toLowerCase();
        this.baseInd = _.findIndex(Note, function (note) {
            return note === baseNote;
        });
    }

    /**
     * Takes integer, finds note that matches within set key. The index may be greater than
     * 12, though it's just modulus if so.
     * @param index {number}
     * @returns {string}
     */
    getNoteFromKey(index: number) : string {
        var num = (this.baseInd + this.key[index])%12;
        return Note[num];
    }

    getScale() : string[]{
        var myThis = this;
        return _.times(this.key.length, function (ind){
            return myThis.getNoteFromKey(ind);
        });
    }

    temporary(list: number[], mCount: number) {
        return matchToSum(list, mCount);
    }

    sigFromAccidentals(count, scale="major"){
        //TODO: do...
    }

    matchingScale(){
        //TODO: finds appropriate minor for major (or vis versa)
    }

}

export = Key;