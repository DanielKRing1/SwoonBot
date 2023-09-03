module.exports = (sequelize, type) => {
    return sequelize.define('geocode', {
        index: {
            type: type.BIGINT,
            primaryKey: true
        },
        geoname_id: type.TEXT,
        name: type.TEXT,
        ascii_name: type.TEXT,
        alternate_names: type.TEXT,
        latitude: type.TEXT,
        longitude: type.TEXT,
        feature_class: type.TEXT,
        feature_code: type.TEXT,
        country_code: type.TEXT,
        alternate_country_codes: type.TEXT,
        admin_code_1: type.TEXT,
        admin_code_2: type.TEXT,
        admin_code_3: type.TEXT,
        admin_code_4: type.TEXT,
        population: type.BIGINT,
        elevation: type.BIGINT,
        dem: type.TEXT,
        timezone: type.TEXT,
        modification_date: type.TEXT,
        coordinate: type.GEOMETRY('POINT', 4326),
        city: type.TEXT,
        city_alternate_names: type.TEXT,
        postal_code: type.TEXT,
        zip_place_name: type.TEXT,
        admin_name_1: type.TEXT,
        admin_name_2: type.TEXT,
        admin_name_3: type.TEXT,
        zip_accuracy: type.TEXT
    },
    {
        timestamps: false,
        freezeTableName: true
    });
}