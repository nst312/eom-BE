import {PrismaClient, Role, role_permission} from '@prisma/client';
import {PERMISSION} from "../src/shared/constants/permission.constants";
import {flatMap} from "lodash";
import {
    CEO_PERMISSION,
    EMPLOYEE_PERMISSION, FINANCE_ADMIN_PERMISSION,
    HR_ADMIN_PERMISSION, HR_EXECUTIVE_PERMISSION,
    SUPER_ADMIN_PERMISSION
} from "../src/modules/permission/permission";
const prisma = new PrismaClient();

export class PermissionSeeder {
    async permission() {
        // delete all the data and restart identity
        await prisma.$queryRaw`TRUNCATE TABLE role_permission RESTART IDENTITY`;
        console.log('permission import started');
        const values = [...SUPER_ADMIN_PERMISSION, ...CEO_PERMISSION, ...EMPLOYEE_PERMISSION, ...HR_ADMIN_PERMISSION, ...FINANCE_ADMIN_PERMISSION, ...HR_EXECUTIVE_PERMISSION]
        const data = values.map((val) => {
            return {
                permission: val.permission,
                role: val.role,
                isPermission: val.isPermission,
                label: val.label,
                module: val.module
            }
        })
        const query = await prisma.role_permission.createMany({
            data,
            // skipDuplicates: true,
        });
        console.log(`Created ${query.count} permission!`)
    }
}