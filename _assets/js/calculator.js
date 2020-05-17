var calculator = new Vue({
  el : '#calculator',
  data : {
    //guilds: new Array(10)
    guilds: [
      '',
      'G1',
      'G2',
      'G3',
      'G4',
      'G5',
      'G6',
      'G7',
      'G8',
      'G9',
      'G10',
    ]
  },
  computed: {
    // Helps render enemy teams in order by power level
    orderedEnemies: function () {
      return orderByPower(this.map.enemySlots);
    },
    // Helps render allied teams in order by power level
    orderedAllies: function () {
      return orderByPower(this.map.ourSlots);
    },
    // Renders total team powers: hero, titan, total
    getAllyPower: function () {
      return getTotalPower(this.map.ourSlots);
    },
    // Renders total enemy team powers: hero, titan, total
    getEnemyPower: function () {
      return getTotalPower(this.map.enemySlots);
    }
  }
});