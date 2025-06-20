from app import app, db
from models import Type, Set, Card

with app.app_context():
    # Clear existing data
    Card.query.delete()
    Type.query.delete()
    Set.query.delete()
    db.session.commit()

    # Add sets
    surging_sparks = Set(name="Surging Sparks")
    destined_rivals = Set(name="Destined Rivals")
    db.session.add_all([surging_sparks, destined_rivals])
    db.session.commit()

    # Add types in requested order
    types = [
        "Colorless", "Grass", "Fire", "Water", "Lightning",
        "Fighting", "Psychic", "Darkness", "Metal", "Dragon", "Fairy"
    ]
    type_objects = [Type(name=t) for t in types]
    db.session.add_all(type_objects)
    db.session.commit()

    # Helper to get type by name
    def get_type(name):
        return Type.query.filter_by(name=name).first()

    # Add Exeggcute card (Surging Sparks) without image_url
    exeggcute = Card(
        name="Exeggcute",
        hp=30,
        type_id=get_type("Grass").id,
        set_id=surging_sparks.id
    )
    
    # Add Team Rocket's Orbeetle card (Destined Rivals) without image_url
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
