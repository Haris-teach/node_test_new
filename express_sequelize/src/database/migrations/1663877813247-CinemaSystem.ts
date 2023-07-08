import { literal,QueryInterface } from 'sequelize';
import { ModelAttributes } from 'sequelize/types/model';
export default {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I don't want to configure the seating for every show
   */


up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('Movies', {
      movie_id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      title: { type: 'varchar' },
      duration: { type: 'varchar' },
     director:{type:'varchar'},
    release_date:{type:'varchar'},
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    await queryInterface.createTable('Shows',{
      show_id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      movie_id:{
        
    type: 'integer',
    references: {
      model:'Movies',
      key: 'movie_id',
    },
      },
      start_time:{
        
      type:'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP')
      },
     end_time:{
      type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP')
      }, 
      cinema_room_id:{
        type:'integer',
      }
    }as ModelAttributes);


await queryInterface.createTable('CinemaRooms',{
  cinema_room_id:{
    type:'intger',
    primaryKey:true,
    autoIncrement:true,
  }, 
  room_number:{
    type:'varchar',
  }, 
  capacity:{
type:'varchar'
  }
}as ModelAttributes);


  await queryInterface.createTable('Pricing', {
  pricing_id: {
    type: 'integer',
    primaryKey: true,
    autoIncrement: true,
  },
  show_id: {
    type: 'integer',
    references: {
      model: 'Shows',
      key: 'show_id',
    },
  },
  price: {
    type: 'varchar',
  },
} as ModelAttributes);

 await queryInterface.createTable('SeatTypes',{
  seat_type_id:{
    type:'interger',
   primaryKey: true,
    autoIncrement: true,
  },
  type_name:{
    type:'varchar',
  }, 
  premium_percentage:{
    type:'varchar',
  }
 }as ModelAttributes);

 await queryInterface.createTable('Seats',{

seat_id:{
   type:'interger',
   primaryKey: true,
    autoIncrement: true,
},  cinema_room_id:{
 
    type: 'integer',
    references: {
      model: 'CinemaRooms',
      key: 'cinema_room_id',
    },
  
}, seat_number:{
  type:'varchar',
}, seat_type_id:{
  type:'integer'
}

 }as ModelAttributes);



 await queryInterface.createTable('Bookings',{
  booking_id:{
     type:'interger',
   primaryKey: true,
    autoIncrement: true,
  }, show_id:{
    type: 'integer',
    references: {
      model: 'Shows',
      key: 'show_id',
    },
  }, seat_id:{
     type: 'integer',
    references: {
      model: 'Seats',
      key: 'seat_id',
    },
  },  user_name:{
    type:'varchar'
  }, ticket_number:{
    type:'varchar'
  }
 }as ModelAttributes)
}


};
