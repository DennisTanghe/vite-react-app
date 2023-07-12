import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Slider, SliderChangeEvent } from 'primereact/slider';
import { Tag } from 'primereact/tag';
//import { CustomerService } from './service/CustomerService';

interface ICountry {
  name: string;
  code: string;
}

interface IBusinessPartner {
  cardCode: string;
  cardName: string;
  active: boolean;
  address: string;
  zipCode: string;
  city: string;
  country: string;
}

const TablePage = () => {
    const [customers, setCustomers] = useState<IBusinessPartner[]>([]);

    const [selectedCustomers, setSelectedCustomers] = useState<IBusinessPartner[]>([]);

    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        activity: { value: null, matchMode: FilterMatchMode.BETWEEN }
    });

    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

    const getSeverity = (status: string) => {
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warning';

            case 'renewal':
                return null;
        }
    };

    useEffect(() => {
        //CustomerService.getCustomersLarge().then((data) => setCustomers(getCustomers(data)));
        setCustomers([
            {
                cardCode: "C00001",
                cardName: "Customer One",
                address: "Street 1",
                zipCode: "1111",
                city: "One",
                country: "BE",
                active: true
            },
            {
                cardCode: "C00002",
                cardName: "Customer Two",
                address: "Street 2",
                zipCode: "1112",
                city: "Two",
                country: "BE",
                active: true
            },
            {
                cardCode: "C00003",
                cardName: "Customer Three",
                address: "Street 3",
                zipCode: "1113",
                city: "Three",
                country: "BE",
                active: true
            },
            {
                cardCode: "C00001",
                cardName: "Customer One",
                address: "Street 1",
                zipCode: "1111",
                city: "One",
                country: "BE",
                active: true
            },
            {
                cardCode: "C00001",
                cardName: "Customer One",
                address: "Street 1",
                zipCode: "1111",
                city: "One",
                country: "BE",
                active: true
            },
            {
                cardCode: "C00001",
                cardName: "Customer One",
                address: "Street 1",
                zipCode: "1111",
                city: "One",
                country: "BE",
                active: true
            },
            {
                cardCode: "C00001",
                cardName: "Customer One",
                address: "Street 1",
                zipCode: "1111",
                city: "One",
                country: "BE",
                active: true
            }
        ]);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    /** Convert date strings to Date objects for each line */
    // const getCustomers = (data: Customer[]) => {
    //     return [...(data || [])].map((d) => {
    //         d.date = new Date(d.date);
    //         return d;
    //     });
    // };

    const formatDate = (value: string | Date) => {
        return new Date(value).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
                <h4 className="m-0">Customers</h4>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

    const countryBodyTemplate = (rowData: IBusinessPartner) => {
        return (
            <div className="flex align-items-center gap-2">
                <img alt="flag" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${rowData.country}`} style={{ width: '24px' }} />
                <span>{rowData.country}</span>
            </div>
        );
    };

    const actionBodyTemplate = () => {
        return <Button type="button" icon="pi pi-cog" rounded></Button>;
    };

    const header = renderHeader();

    return (
        <div className="card">
            <DataTable value={customers} paginator header={header} rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    rowsPerPageOptions={[10, 25, 50]} dataKey="id" selectionMode="checkbox" selection={selectedCustomers} 
                    onSelectionChange={(e) => {
                        const customers = e.value as IBusinessPartner[];
                        setSelectedCustomers(customers);
                    }}
                    filters={filters} filterDisplay="menu" globalFilterFields={['name', 'country.name', 'representative.name', 'balance', 'status']}
                    emptyMessage="No customers found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="cardName" header="Name" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />
                <Column field="address" header="Address" sortable filter filterPlaceholder="Search by address" style={{ minWidth: '14rem' }} />
                <Column field="zipCode" header="Zip Code" sortable filter filterPlaceholder="Search by zip" style={{ minWidth: '14rem' }} />
                <Column field="city" header="City" sortable filter filterPlaceholder="Search by city" style={{ minWidth: '14rem' }} />
                <Column field="country" header="Country" sortable filterField="country" style={{ minWidth: '14rem' }} body={countryBodyTemplate} filter filterPlaceholder="Search by country" />
                <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
            </DataTable>
        </div>
    );
}

export default TablePage;