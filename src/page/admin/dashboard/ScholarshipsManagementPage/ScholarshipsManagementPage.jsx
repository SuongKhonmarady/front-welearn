import { useState, useEffect, useMemo, useContext, useCallback } from 'react';
import ScholarshipDataContext from "../../../../context/scholarship/ScholarshipContext";
import { getScholarship } from "../../../../context/scholarship/Scholarship";
import Spinner from "../../../../ui/shared/Spinner";
import { Scholarships } from '../components';

export default function ScholarshipsManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('deadline');
  const [sortOrder, setSortOrder] = useState('asc');
  const { listScholarship, dispatch, loading } = useContext(ScholarshipDataContext);

  const fetchScholarship = useCallback(async () => {
    const data = await getScholarship();
    dispatch({ type: "SET_SCHOLARSHIP", payload: data });
  }, [dispatch]);

  useEffect(() => {
    fetchScholarship();
  }, [fetchScholarship]);

  // Filter and sort scholarships
  const filteredAndSortedScholarships = useMemo(() => {
    const filtered = listScholarship.filter(scholarship =>
      scholarship.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.organization?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch(sortBy) {
        case 'title':
          aValue = a.title?.toLowerCase() || '';
          bValue = b.title?.toLowerCase() || '';
          break;
        case 'organization':
          aValue = a.organization?.toLowerCase() || '';
          bValue = b.organization?.toLowerCase() || '';
          break;
        case 'deadline':
          aValue = new Date(a.deadline || '1970-01-01');
          bValue = new Date(b.deadline || '1970-01-01');
          break;
        case 'created':
          aValue = new Date(a.created_at || a.addedDate || a.post_at || '1970-01-01');
          bValue = new Date(b.created_at || b.addedDate || b.post_at || '1970-01-01');
          break;
        default:
          return 0;
      }
      
      if (sortBy === 'deadline' || sortBy === 'created') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      } else {
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      }
    });
  }, [listScholarship, searchTerm, sortBy, sortOrder]);

  if (loading) {
    return <Spinner isFull />;
  }
  return (
    <div className="p-8">
      <Scholarships
        filteredAndSortedScholarships={filteredAndSortedScholarships}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        fetchScholarship={fetchScholarship}
      />
    </div>
  );
}
