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
        set_id=surging_sparks.id,
        image_url="https://images.squarespace-cdn.com/content/v1/5cf4cfa4382ac0000123aa1b/1728928746645-KEMHWUL6O2B6TOLM2BNF/SV08_EN_192-2x.png?format=750w"
    )
    
    orbeetle = Card(
        name="Team Rocket's Orbeetle",
        hp=130,
        type_id=get_type("Psychic").id,
        set_id=destined_rivals.id,
        image_url="https://images.squarespace-cdn.com/content/v1/5cf4cfa4382ac0000123aa1b/1748546266604-LRQAVA03UI55HXW3VAUG/sv10_en_198-high.jpg?format=750w"
    )
    
    db.session.add_all([exeggcute, orbeetle])
    db.session.commit()

   