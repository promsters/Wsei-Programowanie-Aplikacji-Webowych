/**
 * @jest-environment jsdom
 */

import {dateToRelativeString, htmlToElement} from "../src/Utils";

test('string html converts to element object', () => {
    const element = htmlToElement('<p class="test">Ehe</p>');
    const expectedElement = document.createElement('p');
    expectedElement.innerHTML = "Ehe";
    expectedElement.classList.add('test');

    expect(element).toStrictEqual(expectedElement);
});

test('dateToRelativeString for today', () => {
    const today = new Date();

    expect(dateToRelativeString(today)).toBe(`dziś, ${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}`)
});

test('dateToRelativeString for yesterday', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    expect(dateToRelativeString(yesterday)).toBe(`wczoraj, ${yesterday.getHours().toString().padStart(2, '0')}:${yesterday.getMinutes().toString().padStart(2, '0')}`)
});

test('dateToRelativeString for yesterday', () => {
    const inThePast = new Date('2019-01-01 00:00:10');

    expect(dateToRelativeString(inThePast)).toBe(`1/1/2019, 00:00`);
});