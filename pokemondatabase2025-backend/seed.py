from app import app, db
from models import Type, Set, Card

with app.app_context():

    Card.query.delete()
    Type.query.delete()
    Set.query.delete()
    db.session.commit()

   
    surging_sparks = Set(name="Surging Sparks")
    destined_rivals = Set(name="Destined Rivals")
    db.session.add_all([surging_sparks, destined_rivals])
    db.session.commit()

    
    types = [
        "Colorless", "Grass", "Fire", "Water", "Lightning",
        "Fighting", "Psychic", "Darkness", "Metal", "Dragon", "Fairy"
    ]
    type_objects = [Type(name=t) for t in types]
    db.session.add_all(type_objects)
    db.session.commit()

   
    def get_type(name):
        return Type.query.filter_by(name=name).first()

    exeggcute = Card(
        name="Exeggcute",
        hp=30,
        type_id=get_type("Grass").id,
        set_id=surging_sparks.id
    )
    
    orbeetle = Card(
        name="Team Rocket's Orbeetle",
        hp=130,
        type_id=get_type("Psychic").id,
        set_id=destined_rivals.id
    )
    
    db.session.add_all([exeggcute, orbeetle])
    db.session.commit()

    print("Seed data added: Exeggcute and Team Rocket's Orbeetle cards.")
    print("Database seeded successfully.")
