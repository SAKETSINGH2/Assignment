import mongoose from "mongoose";

const RuleSchema = new mongoose.Schema(
    {
        ruleString: { type: String, required: true },
        name: { type: String, required: true },
    },
    { timestamps: true }
);

const ruleSchemaModelDbClient = mongoose.model("Rule", RuleSchema);

export default ruleSchemaModelDbClient;
