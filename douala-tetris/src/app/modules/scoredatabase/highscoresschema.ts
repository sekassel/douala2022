import {
    toTypedRxJsonSchema,
    ExtractDocumentTypeFromTypedRxJsonSchema,
    RxJsonSchema,
    RxDocument,
    RxCollection,
    RxDatabase
} from 'rxdb/plugins/core';


export const highScoreSchemaLiteral = {
    title: 'high score schema',
    description: 'describes a high score',
    version: 0,
    keyCompression: true,
    primaryKey: 'dateTime',
    type: 'object',
    properties: {
        dateTime: {
            type: 'string'
        },
        score: {
            type: 'number'
        },
        player: {
            type: 'string'
        }
    },
    required: ['dateTime', 'score'],
    indexes: ['score']
} as const; // <- It is important to set 'as const' to preserve the literal type
export const schemaTyped = toTypedRxJsonSchema(highScoreSchemaLiteral);

// aggregate the document type from the schema
export type HighScoreDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>;

// create the typed RxJsonSchema from the literal typed object.
export const highScoreSchema: RxJsonSchema<HighScoreDocType> = highScoreSchemaLiteral;

export type HighScoreDocMethods = {
    scream: (v: string) => string;
};

export const highScoreDocMethods: HighScoreDocMethods = {
    scream: function(this: HighScoreDocument, what: string) {
        return this.dateTime + ' screams: ' + what.toUpperCase();
    }
};

type HighScoreDocument = RxDocument<HighScoreDocType, HighScoreDocMethods>;

// we declare one static ORM-method for the collection
type HighScoreCollectionMethods = {
    countAllDocuments: () => Promise<number>;
}

export const highScoreCollectionMethods: HighScoreCollectionMethods = {
    countAllDocuments: async function(this: HighScoreCollection) {
        const allDocs = await this.find().exec();
        return allDocs.length;
    }
};

// and then merge all our types
export type HighScoreCollection = RxCollection<HighScoreDocType, HighScoreDocMethods, HighScoreCollectionMethods>;

export type HighScoreDatabaseCollections = {
    scores: HighScoreCollection
}

export type HighScoreDatabase = RxDatabase<HighScoreDatabaseCollections>;