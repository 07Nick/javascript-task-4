'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = false;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    let commands = new Map();

    return {

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         */

        on: function (event, context, handler) {
            if (!commands.has(event)) {
                commands.set(event, new Map());
            }
            commands.get(event).set(context, handler);

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         */

        off: function (event, context) {
            commands.get(event).delete(context);

            return this;
        },

        getEvent: function (event) {
            commands.get(event).forEach((student, handler) => {
                student.call(handler);
            });
        },

        /**
         * Уведомить о событии
         * @param {String} event
         */

        emit: function (event) {
            let second = event.split('.')[0];
            if (commands.has(event)) {
                this.getEvent(event);
            }
            if (commands.has(second) && second !== event) {
                this.getEvent(second);
            }

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         */
        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         */
        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);
        }
    };
}

module.exports = {
    getEmitter,

    isStar
};
