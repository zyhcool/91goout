import * as uuid from "uuid";

export default function getUUid() {
    return uuid.v4().replace(/-/g, '');
}